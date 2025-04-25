import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {PointageVehiculeService} from '../../services/pointage-vehicule.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {VehiculeService} from '../../services/vehicule.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Vehicule} from '../../modeles/Vehicule';
import {PointageVehicule} from '../../modeles/PointageVehicule';
import {MatPaginator} from '@angular/material/paginator';
import {SupprimerPointageVehiculeComponent} from '../supprimer-pointage-vehicule/supprimer-pointage-vehicule.component';
import {MatDialog} from '@angular/material/dialog';
import {MatInput} from '@angular/material/input';
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
    MatTable,
    MatHeaderCellDef,
    MatPaginator,
    MatIconButton,
    MatInput,
    MatSortHeader,
    NgOptimizedImage,
    MatNoDataRow
  ],
  templateUrl: './imprimer-pointage-vehicule.component.html',
  styleUrl: './imprimer-pointage-vehicule.component.css'
})
export class ImprimerPointageVehiculeComponent implements OnInit {

  dataSource = new MatTableDataSource<PointageVehicule>;
  dataSourceVehicule = new MatTableDataSource<Vehicule>;
  displayedColumns: string[] = ['num','immatriculation','modele','date','supprimer'];
  message = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  debut: any;
  fin: any;
  vehicule!: Vehicule;
  constructor(private service: PointageVehiculeService, private vehiculeService: VehiculeService,private dialog:MatDialog) {}
  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.vehiculeService.listeVehicule().subscribe({
      next: data => {
        this.dataSourceVehicule.data = data.vehicule;
        },
    });
    this.service.liste().subscribe({
      next: (data: any) => {
        this.dataSource.data = data.pointage && data.pointage.length > 0 ? data.pointage : [];
        this.dataSource.paginator=this.paginator;
        this.message = data.message;
      }
    });
    this.dataSource.sortingDataAccessor = (item: PointageVehicule, property: string) => {
      if (property === 'date') {
        return new Date(item.date).getTime();
      }
      return (item as any)[property] ?? '';
    };

  }

  rechercher(vehicule: Vehicule, debut: Date | null, fin: Date | null): void {
    this.dataSource.data = [];
    this.message = "";

    const traiterReponse = (data: any) => {
      if (!data || !data.pointage) {
        this.message = data.message || "Aucune donnée trouvée.";
        return;
      }
      this.dataSource.data = data.pointage && data.pointage.length > 0 ? data.pointage : [];
      this.message = data.message;

    };

    if (vehicule && debut && fin) {
      this.service.listeDates(vehicule.id, debut, fin).subscribe({
        next: (data )=> {
          if (!data || !data.pointage) {
            this.message = data.message || "Aucune donnée trouvée.";
            return;
          }
          this.dataSource.data = data.pointage && data.pointage.length > 0 ? data.pointage : [];
          this.message = data.message;
        }
      });
    }
    else if (debut && fin) {
      this.service.listePeriode(debut, fin).subscribe({
        next: traiterReponse,
      });
    }
    else if (vehicule) {
      this.service.vehicule(vehicule.id).subscribe({
        next: traiterReponse
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
        next: impression
      });
    }
    else if (debut && fin) {
      this.service.listePeriode(debut, fin).subscribe({
        next: impression
      });
    }
    else if (vehicule) {
      this.service.vehicule(vehicule.id).subscribe({
        next: impression
      });
    }
    else {
      this.message = "Veuillez sélectionner un véhicule.";
    }
  }
  supprimer(id: number): void {
    const dialogRef = this.dialog.open(SupprimerPointageVehiculeComponent, {
      width: "500px",
      maxWidth: "600px",
      data: { id }
    });

    dialogRef.afterClosed().subscribe(resultat => {
      if (resultat === 'confirm') {
        this.service.liste().subscribe({
          next: (data: any) => {
            this.dataSource.data =  data.pointage;
            this.message = data.message || '';
          }
        });
      }
    });
  }

}

