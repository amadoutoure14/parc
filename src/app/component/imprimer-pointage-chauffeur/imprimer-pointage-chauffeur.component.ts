import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatNoDataRow,
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
import {SupprimerPointageChaffeurComponent} from '../supprimer-pointage-chaffeur/supprimer-pointage-chaffeur.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatInput} from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog';

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
    MatHeaderCellDef,
    MatSortHeader,
    MatNoDataRow,
    MatPaginator,
    MatInput,
    MatIconButton,
    NgOptimizedImage
  ],
  templateUrl: './imprimer-pointage-chauffeur.component.html',
  styleUrl: './imprimer-pointage-chauffeur.component.css'
})
export class ImprimerPointageChauffeurComponent implements OnInit, AfterViewInit {
  pointages: PointageChauffeur[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['index', 'chauffeur', 'telephone', 'date', 'supprimer'];
  message = "";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  debut: any;
  fin: any;
  chauffeur!: Chauffeur;
  chauffeurs: Chauffeur[] = [];
  constructor(private service: PointageChauffeurService, private chauffeurService: ChauffeurService, private snackbar: MatSnackBar,private dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'date') {
        return item.date ? new Date(item.date).getTime() : 0;
      }
      return item[property];
    };
  }
  ngOnInit(): void {
    this.service.liste().subscribe({
      next: (data: any) => {
        this.dataCarburants(data);
      }
    });
    this.chauffeurService.listeChauffeur().subscribe({
      next: data => {
        this.chauffeurs = data.chauffeur || [];
      }
    });
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'date') {
        return item.date ? new Date(item.date).getTime() : 0;
      }
      return item[property];
    };
    this.dataSource.filterPredicate = this.createFilterPredicate();

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.sort && this.paginator) {
        this.sort.active = 'date';
        this.sort.direction = 'desc';
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
      this.dataCarburants(data);
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
      const dateString = `Imprimé le ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} à ${today.getHours()}:${today.getMinutes()}`;
      doc.text(dateString, doc.internal.pageSize.width - 92, doc.internal.pageSize.height - 34);
      doc.save(`Pointage_${today.toISOString().split('T')[0]}.pdf`);
    };
  }
  private dataCarburants(data: any): void {
    if (!data || !data.pointage) {
      this.message = data.message || "Aucune donnée trouvée.";
      return;
    }
    this.pointages = data.pointage.sort((a: PointageChauffeur, b: PointageChauffeur) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.dataSource.data = this.pointages;
    this.dataSource.sort = this.sort;
    this.sort.active='desc'
    this.sort.direction='desc';
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  supprimer(id: number): void {
    const dialogRef = this.dialog.open(SupprimerPointageChaffeurComponent, {
      width: "500px",
      maxWidth: "600px",
      data: { id }
    });

    dialogRef.afterClosed().subscribe(resultat => {
      if (resultat === 'confirm') {
        this.service.liste().subscribe({
          next: (data: any) => {
            this.dataSource.data = data.pointage;
            this.dataSource.paginator=this.paginator;
            this.message = data.message || '';
          }
        });
      }
    });
  }
  private createFilterPredicate(): (data: PointageChauffeur, filter: string) => boolean {
    return (data: PointageChauffeur, filter: string): boolean => {
      const dataStr = `
      ${data.chauffeur?.nom_complet ?? ''}
      ${data.chauffeur?.telephone ?? ''}
      ${new Date(data.date).toLocaleDateString('fr-FR')}
    `.toLowerCase();
      return dataStr.includes(filter);
    };
  }

}
