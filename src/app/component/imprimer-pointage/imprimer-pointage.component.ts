import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {PointageService} from '../../services/pointage.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {VehiculeService} from '../../services/vehicule.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-imprimer-pointage',
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    FormsModule,
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    NgIf
  ],
  templateUrl: './imprimer-pointage.component.html',
  styleUrl: './imprimer-pointage.component.css'
})
export class ImprimerPointageComponent implements OnInit, AfterViewInit {
  pointages: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['index', 'vehicule', 'modele', 'datePointage'];
  message = "";
  filterTerm = "";

  @ViewChild(MatSort) sort!: MatSort;
  debut: any;
  fin: any;
  vehicule: any = null;
  vehicules: any[] = [];

  constructor(private service: PointageService, private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.vehiculeService.listeVehicule().subscribe({
      next: data => { this.vehicules = data.vehicule; },
      error: err => { console.error('Erreur lors du chargement des véhicules:', err); }
    });
    this.service.liste().subscribe({
      next: (data: any) => {
        this.pointages = data.pointage && data.pointage.length > 0 ? data.pointage : [];
        // Tri croissant sur la date
        this.pointages.sort((a, b) => new Date(a.datePointage).getTime() - new Date(b.datePointage).getTime());
        this.dataSource.data = this.pointages;
        this.message = data.message;
      },
      error: err => {
        this.message = "Erreur lors du chargement des pointages.";
        console.error('Erreur:', err);
      }
    });

    // Configurer le tri personnalisé pour les dates dans le tableau
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'datePointage') {
        return new Date(item.datePointage).getTime();
      }
      return item[property];
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  rechercher(vehicule: any, debut: Date | null, fin: Date | null): void {
    this.pointages = [];
    this.dataSource.data = [];
    this.message = "";
    const traiterReponse = (data: any) => {
      if (!data || !data.pointage) {
        this.message = data.message || "Aucune donnée trouvée.";
        return;
      }
      this.pointages = data.pointage;
      // Tri croissant sur la date
      this.pointages.sort((a, b) => new Date(a.datePointage).getTime() - new Date(b.datePointage).getTime());
      this.dataSource.data = this.pointages;
      this.dataSource.sort = this.sort;  // Réinitialiser le tri après la recherche
    };

    if (vehicule && debut && fin) {
      this.service.listeDates(vehicule.id, debut, fin).subscribe({
        next: traiterReponse,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else if (vehicule && (debut || fin)) {
      const dateUnique = debut ?? fin;
      this.service.listeDate(vehicule.id, dateUnique).subscribe({
        next: traiterReponse,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else if (debut && fin) {
      this.service.listePeriode(debut, fin).subscribe({
        next: traiterReponse,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else if (vehicule) {
      this.service.vehicule(vehicule.id).subscribe({
        next: traiterReponse,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else {
      this.message = "Veuillez sélectionner un véhicule.";
    }
  }

  imprimer(vehicule: any, debut: Date | null, fin: Date | null): void {
    const impression = (data: any) => {
      if (!data || !data.pointage) {
        this.message = data.message || "Aucune donnée trouvée.";
        return;
      }
      if (data.pointage.length > 0) {
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
          // Tri croissant sur la date avant la génération du PDF
          data.pointage.sort((a: { datePointage: string | number | Date; }, b: { datePointage: string | number | Date; }) => new Date(a.datePointage).getTime() - new Date(b.datePointage).getTime());
          const header = ["Numéro", "Véhicule", "Modèle", "Date"];
          const pointage = data.pointage.map(
            (p: { id: number; vehicule: any; datePointage: string }, index: number) => [
              index + 1,
              p.vehicule.immatriculation,
              p.vehicule.modele,
              new Date(p.datePointage).toLocaleDateString('fr-FR')
            ]
          );
          autoTable(
            doc, {
              startY: 55,
              head: [header],
              body: pointage
            });
          const today = new Date();
          const dateString = `Fait à ............................... le : ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
          doc.text(dateString, doc.internal.pageSize.width - 92, doc.internal.pageSize.height - 34);
          doc.save('pointage imprimer le ' + today.toDateString() + '.pdf');
        };
        img.onerror = function () {
          console.error("Erreur lors du chargement de l'image.");
        };
      }
    };

    if (vehicule && debut && fin) {
      this.service.listeDates(vehicule.id, debut, fin).subscribe({
        next: impression,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else if (vehicule && (debut || fin)) {
      const dateUnique = debut ?? fin;
      this.service.listeDate(vehicule.id, dateUnique).subscribe({
        next: impression,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else if (debut && fin) {
      this.service.listePeriode(debut, fin).subscribe({
        next: impression,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else if (vehicule) {
      this.service.vehicule(vehicule.id).subscribe({
        next: impression,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else {
      this.message = "Veuillez sélectionner un véhicule.";
    }
  }
}

