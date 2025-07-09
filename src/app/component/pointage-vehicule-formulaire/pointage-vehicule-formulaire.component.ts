import {Component, OnInit, ViewChild} from '@angular/core';
import {VehiculeService} from '../../services/vehicule.service';
import {Vehicule} from '../../modeles/Vehicule';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PointageVehiculeService} from '../../services/pointage-vehicule.service';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatInput} from '@angular/material/input';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {PointageVehicule} from '../../modeles/PointageVehicule';


@Component({
  selector: 'app-pointage-formulaire',
  imports: [
    FormsModule,
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatRowDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatButton,
    NgIf,
    MatInput,
    MatPaginator,
    MatNoDataRow,
  ],
  templateUrl: './pointage-vehicule-formulaire.component.html',
  styleUrl: './pointage-vehicule-formulaire.component.css'
})
export class PointageVehiculeFormulaireComponent implements OnInit {

  date!: Date|null;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['immatriculation','modele','pointer','soumettre'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private VehiculeService: VehiculeService, private snackBar: MatSnackBar, private service: PointageVehiculeService) {}

  ngOnInit(): void {

    this.VehiculeService.listeVehicule().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.vehicule);
        this.dataSource.paginator=this.paginator
        this.sort.active='date'
        this.sort.direction='desc'
        this.dataSource.sort = this.sort;
        this.snackBar.open(data.message, "Fermer", { duration: 3000 });
      }
    });
    this.dataSource.filterPredicate = (data: Vehicule, filter: string) => {
      const term = filter.toLowerCase();
      const immatriculation = data.immatriculation?.toLowerCase() || '';
      return immatriculation.includes(term) ;
    };

    this.dataSource.sortingDataAccessor = (item: Vehicule, property: string) => {
      if (property === 'date') {
        return new Date(item.date).getTime();
      }
      return (item as any)[property] ?? '';
    };
  }

  submit(vehicule: Vehicule) {
    if (vehicule.cocher) {
      this.service.pointer(this.date, vehicule.id).subscribe({
        next: (data: any) => {
          vehicule.cocher = false;
          this.snackBar.open(data.message, "Fermer", { duration: 3000 });
        },
        error: (err) => {
          const errorMessage = err.error?.message || "Une erreur est survenue";
          this.snackBar.open(errorMessage, "Fermer", { duration: 3000 });
        }
      });
    }
  }


  resetDate(vehicule: Vehicule) {
    if (!vehicule.cocher) {
      this.date = null;
    }
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


/*
<table *ngIf="vehicules && vehicules.length > 0" class="table">
  <thead>
  <tr>
    <th>Véhicule</th>
    <th>Modèle</th>
    <th>Pointer</th>
    <th>Soumettre</th>
  </tr>
  </thead>
  <tbody>
  <tr *ngFor="let vehicule of vehicules; let i = index">
    <td>{{ vehicule.immatriculation }}</td>
    <td>{{ vehicule.modele }}</td>
    <td>
      <input type="checkbox" [(ngModel)]="vehicule.cocher" (ngModelChange)="resetDate(vehicule)">
      <input type="date" [(ngModel)]="date" *ngIf="vehicule.cocher">
    </td>
    <td>
      <button mat-flat-button (click)="submit(vehicule)" class="submit" [disabled]="!vehicule.cocher">
        Pointer
      </button>
    </td>
  </tr>

  </tbody>
</table>


*/
