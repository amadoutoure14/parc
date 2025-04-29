import {Component, OnInit, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Carburant} from '../../modeles/Carburant';
import {VehiculeService} from '../../services/vehicule.service';
import {Vehicule} from '../../modeles/Vehicule';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {CarburantService} from '../../services/carburant.service';
import {ModifierCarburantComponent} from '../modifier-carburant/modifier-carburant.component';
import {MatDialog} from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  MatCell, MatCellDef,
  MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatInput} from '@angular/material/input';
import {PointageChauffeur} from '../../modeles/PointageChauffeur';

@Component({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  selector: 'app-rechercher-carburant',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    NgForOf,
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatTable,
    MatPaginator,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    DatePipe,
    MatInput,
    MatNoDataRow,
  ],
  templateUrl: './imprimer-carburant.component.html',
  styleUrl: './imprimer-carburant.component.css'
})
export class ImprimerCarburantComponent implements OnInit {

  dataSource=new MatTableDataSource<Carburant>;
  dataSourceVehicule=new MatTableDataSource<Vehicule>;
  vehicule!: Vehicule;
  debut!: Date;
  fin!: Date;
  message="";
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  displayedColumns: string[]=['numero','vehicule','carburant','date'];


  constructor(private serviceVehicule: VehiculeService, private service: CarburantService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadVehicules();
    this.loadCarburants();
    this.dataSource.filterPredicate = this.createFilterPredicate();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadVehicules(): void {
    this.serviceVehicule.listeVehicule().subscribe({
      next: (data) => {
        this.dataSourceVehicule.data=data.vehicule;
      }
    });
  }
  loadCarburants(): void {
    this.service.listeApprov().subscribe({
      next: (data) => {
        this.dataSource.data=data.carburant || [];
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  modifier(carburant: Carburant): void {
    const dialogRef = this.dialog.open(ModifierCarburantComponent, { data: carburant });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCarburants();
      }
    });
  }
  imprimer(vehicule: any, debut: Date | null, fin: Date | null): void {
    const impression = (data: any) => {
      if (!data || !data.carburant) {
        this.message = data.message || "Aucune donnée trouvée.";
        return;
      }
      if (data.carburant.length > 0) {
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

          data.carburant.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const header = ["Numéro", "Véhicule","Quantité", "Date"];

          const carburant = data.carburant.map(
            (p: { id: number; approv: number; date: string;vehicule:Vehicule }, index: number) => [
              index + 1,
              p.vehicule.immatriculation,
              `${p.approv} ${p.approv === 1 ? 'litre' : 'litres'}`,
              new Date(p.date).toLocaleDateString('fr-FR')
            ]
          );
          autoTable(doc, {
            startY: 55,
            head: [header],
            body: carburant
          });

          const today = new Date();
          const dateString = `Imprimé le ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} à ${today.getHours()}:${today.getMinutes()}`;
          doc.text(dateString, pdfWidth - 75, doc.internal.pageSize.height - 34);
          doc.save(`carburant_${today.toISOString().split('T')[0]}.pdf`);
        };

        img.onerror = function () {
          console.error();
        };
      }
    };
    if (vehicule && debut && fin) {
      this.service.vehiculeDates(vehicule, debut, fin).subscribe({
        next: impression,
      });
    }

    else if (debut && fin) {
      this.service.periode(debut, fin).subscribe({
        next: impression,
        error: () => { this.message = "Erreur lors de la récupération des carburants."; }
      });
    }
    else if (vehicule) {
      this.service.vehicule(vehicule.id).subscribe({
        next: impression,
        error: () => { this.message = "Erreur lors de la récupération des carburants."; }
      });
    }
    else {
      this.message = "Veuillez sélectionner un véhicule.";
    }
  }
  rechercher(vehicule: Vehicule, debut: Date, fin: Date): void {
    if (vehicule) {
      if (debut && fin) {
        this.service.vehiculeDates(vehicule, debut, fin).subscribe({
          next: (data) => {
            this.dataSource=data.carburant || [];
          }
        });
      } else {
        this.service.vehicule(vehicule.id).subscribe({
          next: (data) => {
            this.dataSource.data=data.carburant || [];
          }
        });
      }
    } else if (debut && fin) {
      this.service.periode(debut, fin).subscribe({
        next: (data:any) => {
          this.dataSource.data= data.carburant || [];
        }
      });
    }
  }
  private createFilterPredicate(): (data: Carburant, filter: string) => boolean {
    return (data: Carburant, filter: string): boolean => {
      const dataStr = `
      ${data.approv}
      ${data.vehicule?.immatriculation}
      ${new Date(data.date).toLocaleDateString('fr-FR')}
    `.toLowerCase();
      return dataStr.includes(filter);
    };
  }

}
