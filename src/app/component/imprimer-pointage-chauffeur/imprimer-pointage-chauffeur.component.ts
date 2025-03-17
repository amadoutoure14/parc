import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Chauffeur} from '../../modeles/Chauffeur';
import {ChauffeurService} from '../../services/chauffeur.service';
import {PointageChauffeurService} from '../../services/pointage-chauffeur.service';
import {PointageChauffeur} from '../../modeles/PointageChauffeur';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-imprimer-pointage-chauffeur',
  imports: [
    DatePipe,
    FormsModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatLabel,
    MatOption,
    MatRow,
    MatRowDef,
    MatSelect,
    MatSort,
    MatTable,
    NgForOf,
    NgIf,
    MatHeaderCellDef,
    MatSortHeader,
  ],
  templateUrl: './imprimer-pointage-chauffeur.component.html',
  styleUrl: './imprimer-pointage-chauffeur.component.css'
})
export class ImprimerPointageChauffeurComponent implements OnInit, AfterViewInit {
  pointages: PointageChauffeur[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['index', 'chauffeur', 'telephone', 'date'];
  message = "";
  filterTerm = "";

  @ViewChild(MatSort) sort!: MatSort;

  debut: any;
  fin: any;
  chauffeur!: Chauffeur;
  chauffeurs: Chauffeur[] = [];

  constructor(private service: PointageChauffeurService, private chauffeurService: ChauffeurService, private snackbar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'date') {
        return item.date ? new Date(item.date).getTime() : 0;
      }
      return item[property];
    };
  }


  ngOnInit(): void {
    this.chauffeurService.listeChauffeur().subscribe({
      next: data => {
        this.chauffeurs = data.chauffeur || [];
      },
      error: err => {
        console.error('Erreur lors du chargement des chauffeurs:', err);
      }
    });


    this.service.liste().subscribe({
      next: (data: any) => {
        this.mettreAJourDonnees(data);
      },
      error: err => {
        this.message = "Erreur lors du chargement des pointages.";
        console.error('Erreur:', err);
      }
    });

    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'date') {
        return item.date ? new Date(item.date).getTime() : 0;
      }
      return item[property];
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }



  rechercher(chauffeur: Chauffeur, debut: Date | null, fin: Date | null): void {
    if (!chauffeur && !debut && !fin) {
      this.message = "Veuillez sélectionner au moins un critère de recherche.";
      return;
    }

    this.pointages = [];
    this.dataSource.data = [];
    this.message = "";

    const traiterReponse = (data: any) => {
      this.mettreAJourDonnees(data);
    };

    if (chauffeur && debut && fin) {
      this.service.listeDates(chauffeur.id, debut, fin).subscribe({ next: traiterReponse, error: () => this.message = "Erreur lors de la récupération des pointages." });
    } else if (chauffeur && (debut || fin)) {
      const dateUnique = debut ?? fin;
      this.service.listeDate(chauffeur.id, dateUnique).subscribe({ next: traiterReponse, error: () => this.message = "Erreur lors de la récupération des pointages." });
    } else if (debut && fin) {
      this.service.listePeriode(debut, fin).subscribe({ next: traiterReponse, error: () => this.message = "Erreur lors de la récupération des pointages." });
    } else if (chauffeur) {
      this.service.chauffeur(chauffeur.id).subscribe({ next: traiterReponse, error: () => this.message = "Erreur lors de la récupération des pointages." });
    } else {
      this.message = "Veuillez sélectionner un chauffeur.";
    }
  }

  imprimer(chauffeur: Chauffeur, debut: Date, fin: Date): void {
    if (chauffeur && debut && fin) {
      this.service.listeDates(chauffeur.id, debut, fin).subscribe({
        next: data => this.impression(data),
        error: () => this.snackbar.open("Erreur lors de la récupération des pointages.", 'Fermer', { duration: 3000 })
      });
    } else if (debut && fin) {
      this.service.listePeriode(debut, fin).subscribe({
        next: data => this.impression(data),
        error: () => this.snackbar.open("Erreur lors de la récupération des pointages.", 'Fermer', { duration: 3000 })
      });
    } else if (chauffeur) {
      this.service.chauffeur(chauffeur.id).subscribe({
        next: data => this.impression(data),
        error: () => this.snackbar.open("Erreur lors de la récupération des pointages.", 'Fermer', { duration: 3000 })
      });
    } else {
      this.snackbar.open("Sélectionner une option de recherche !", 'Fermer', { duration: 3000 });
    }
  }


  impression(data: any): void {
    if (!data || !data.pointage) {
      this.message = data.message || "Aucune donnée trouvée.";
      return;
    }

    const doc = new jsPDF();
    const logoPath = 'assets/logo.png';
    const img = new Image();
    img.src = logoPath;

    img.onload = () => {
      doc.addImage(img, 'PNG', 10, 10, 30, 30);
      doc.setFont('Cambria', 'bold');
      doc.setFontSize(14);

      const pdfWidth = doc.internal.pageSize.width;
      const textWidth = doc.getTextWidth(data.message.toUpperCase());
      const textX = (pdfWidth - textWidth) / 2;
      doc.text(data.message.toUpperCase(), textX + 12, 25);

      data.pointage.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      const header = ["Numéro", "Chauffeur", "Téléphone", "Date"];
      const pointage = data.pointage.map(
        (p: { id: number; chauffeur: Chauffeur; date: string }, index: number) => [
          index + 1,
          p.chauffeur.nom_complet,
          p.chauffeur.telephone,
          new Date(p.date).toLocaleDateString('fr-FR')
        ]
      );

      autoTable(doc, {
        startY: 55,
        head: [header],
        body: pointage
      });

      const today = new Date();
      const dateString = `Fait à ............................... le : ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
      doc.text(dateString, doc.internal.pageSize.width - 92, doc.internal.pageSize.height - 34);
      doc.save(`Pointage_${today.toISOString().split('T')[0]}.pdf`);
    };
  }


  private mettreAJourDonnees(data: any): void {
    if (!data || !data.pointage) {
      this.message = data.message || "Aucune donnée trouvée.";
      return;
    }
    this.pointages = data.pointage.sort((a: PointageChauffeur, b: PointageChauffeur) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    this.dataSource.data = this.pointages;
    this.dataSource.sort = this.sort;
  }

}


