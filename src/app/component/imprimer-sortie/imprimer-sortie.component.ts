import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import jsPDF from 'jspdf';
import {Vehicule} from '../../modeles/Vehicule';
import autoTable from 'jspdf-autotable';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {VehiculeService} from '../../services/vehicule.service';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-imprimer-sortie',
  imports: [
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    DatePipe,
    MatFormField,
    MatLabel,
    MatOption,
    MatFormField,
    MatSelect,
    MatFormField,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    NgIf
  ],
  providers: [DatePipe],
  templateUrl: './imprimer-sortie.component.html',
  styleUrl: './imprimer-sortie.component.css'
})
export class ImprimerSortieComponent implements OnInit {
  message = '';
  debut!: Date;
  fin!: Date;
  sortie!: Sortie;
  vehicules: Vehicule[] = [];
  dataSource = new MatTableDataSource<Sortie>();
  displayedColumns: string[] = ['numero', 'nom', 'telephone', 'vehicule', 'objet', 'depart', 'destination', 'debut', 'fin'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: SortieService,
    private snackBar: MatSnackBar,
    private vehiculeService: VehiculeService
  ) {}

  ngOnInit(): void {
    this.vehiculeService.listeVehicule().subscribe({
      next: (data: any) => {
        this.vehicules = data.vehicule;
      }
    });

    this.service.listeSortie().subscribe({
      next: (data) => {
        this.dataSource.data = data.sortie;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  rechercher(sortie: Sortie, debut: Date, fin: Date) {
    const traiterReponse = (data: any) => {
      if (!data || !data.sortie || data.sortie.length === 0) {
        this.message = data.message || 'Aucune donnée trouvée.';
        this.dataSource.data = [];
        return;
      }
      this.message = data.message;
      this.dataSource.data = data.sortie;
      this.dataSource.paginator = this.paginator;
      this.snackBar.open(data.message, 'Fermer', { duration: 3000 });
    };

    if (sortie && debut && fin) {
      this.service.sortiePeriod(sortie.id, debut, fin).subscribe({ next: traiterReponse });
    } else if (debut && fin) {
      this.service.sortieDates(debut, fin).subscribe({ next: traiterReponse });
    } else if (sortie) {
      this.service.idSortie(sortie.id).subscribe({ next: traiterReponse });
    } else {
      this.message = 'Veuillez sélectionner un véhicule.';
    }
  }

  imprimer(sortie: Sortie, debut: Date, fin: Date) {
    const impression = (data: any) => {
      if (!data || !data.pointage || data.pointage.length === 0) {
        this.message = data.message || 'Aucune donnée trouvée.';
        return;
      }

      const doc = new jsPDF();
      const logoPath = 'assets/logo.png';
      const img = new Image();
      img.src = logoPath;

      img.onload = function () {
        doc.addImage(img, 'PNG', 10, 10, 30, 30);
        doc.setFont('Cambria', 'bold');
        doc.setFontSize(14);

        const pdfWidth = doc.internal.pageSize.width;
        const textWidth = doc.getTextWidth(data.message.toUpperCase());
        const textX = (pdfWidth - textWidth) / 2;
        doc.text(data.message.toUpperCase(), textX + 12, 25);

        data.sortie.sort((a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const header = ['Numéro', 'Véhicule', 'Modèle', 'Carburant', 'Date'];
        const rows = data.sortie.map((p: any, index: number) => [
          index + 1,
          p.vehicule.immatriculation,
          p.vehicule.modele,
          p.carburant ?? 'N/A',
          new Date(p.date).toLocaleDateString('fr-FR')
        ]);

        autoTable(doc, { startY: 55, head: [header], body: rows });

        const today = new Date();
        const dateString = `Imprimé le ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} à ${today.getHours()}:${today.getMinutes()}`;
        doc.text(dateString, pdfWidth - 75, doc.internal.pageSize.height - 34);
        doc.save(`Pointage_${today.toISOString().split('T')[0]}.pdf`);
      };
    };

    if (sortie && debut && fin) {
      this.service.sortiePeriod(sortie.id, debut, fin).subscribe({ next: impression });
    } else if (debut && fin) {
      this.service.sortieDates(debut, fin).subscribe({ next: impression });
    } else if (sortie) {
      this.service.idSortie(sortie.id).subscribe({ next: impression });
    } else {
      this.message = 'Veuillez sélectionner un véhicule.';
    }
  }
}

