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
import {Vehicule} from '../../modeles/Vehicule';
import {PointageVehicule} from '../../modeles/PointageVehicule';

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
  templateUrl: './imprimer-pointage-vehicule.component.html',
  styleUrl: './imprimer-pointage-vehicule.component.css'
})
export class ImprimerPointageVehiculeComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<PointageVehicule>();
  displayedColumns: string[] = ['index', 'vehicule', 'modele', 'carburant', 'date'];
  message = "";
  filterTerm = "";

  @ViewChild(MatSort) sort!: MatSort;
  debut: any;
  fin: any;
  vehicule!: Vehicule;
  vehicules: Vehicule[] = [];
  pointages: PointageVehicule[] = [];

  constructor(private service: PointageService, private vehiculeService: VehiculeService) {}

  ngOnInit(): void {

    this.vehiculeService.listeVehicule().subscribe({
      next: data => { this.vehicules = data.vehicule; },
      error: err => { console.error(err); }
    });
    this.service.liste().subscribe({
      next: (data: any) => {
        this.pointages = data.pointage && data.pointage.length > 0 ? data.pointage : [];
        this.pointages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.dataSource.data = this.pointages;
        this.dataSource.sort = this.sort;
        this.message = data.message;
      },
      error: err => {
        this.message = "Erreur lors du chargement des pointages.";
        console.error(err);
      }
    });
    this.dataSource.sortingDataAccessor = (item: PointageVehicule, property: string) => {
      if (property === 'date') {
        return new Date(item.date).getTime();
      }
      return (item as any)[property] ?? '';
    };

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  rechercher(vehicule: Vehicule, debut: Date | null, fin: Date | null): void {
    this.pointages = [];
    this.dataSource.data = [];
    this.message = "";

    const traiterReponse = (data: any) => {
      if (!data || !data.pointage) {
        this.message = data.message || "Aucune donnée trouvée.";
        return;
      }
      this.pointages = data.pointage && data.pointage.length > 0 ? data.pointage : [];
      this.pointages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.dataSource.data = this.pointages;
      this.dataSource.sort = this.sort;
      this.message = data.message;

    };

    if (vehicule && debut && fin) {
      this.service.listeDates(vehicule.id, debut, fin).subscribe({
        next: (data )=> {
          if (!data || !data.pointage) {
            this.message = data.message || "Aucune donnée trouvée.";
            return;
          }
          this.pointages = data.pointage && data.pointage.length > 0 ? data.pointage : [];
          this.pointages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          this.dataSource.data = this.pointages;
          this.dataSource.sort = this.sort;
          this.message = data.message;

        },
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

          data.pointage.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const header = ["Numéro", "Véhicule", "Modèle", "Carburant", "Date"];

          const pointage = data.pointage.map(
            (p: { id: number; vehicule: Vehicule; date: string; carburant: number }, index: number) => [
              index + 1,
              p.vehicule.immatriculation,
              p.vehicule.modele,
              p.carburant ?? "N/A",
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
          doc.text(dateString, pdfWidth - 75, doc.internal.pageSize.height - 34);
          doc.save(`Pointage_${today.toISOString().split('T')[0]}.pdf`);
        };

        img.onerror = function () {
          console.error();
        };
      }
    };
    if (vehicule && debut && fin) {
      this.service.listeDates(vehicule.id, debut, fin).subscribe({
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

