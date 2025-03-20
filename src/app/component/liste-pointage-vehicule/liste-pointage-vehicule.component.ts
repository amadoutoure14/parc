import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {PointageService} from '../../services/pointage.service';
import {PointageVehicule} from '../../modeles/PointageVehicule';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {SupprimerPointageComponent} from '../supprimer-pointage/supprimer-pointage.component';


@Component({
  selector: 'app-liste-pointage',
  providers: [DatePipe],
  imports: [
    FormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatInput,
    MatNoDataRow,
    DatePipe,
    MatSortHeader,
    MatSort,
    MatIconButton
  ],
  templateUrl: './liste-pointage-vehicule.component.html',
  styleUrl: './liste-pointage-vehicule.component.css'
})
export class ListePointageVehiculeComponent implements OnInit, AfterViewInit {
  pointages: PointageVehicule[] = [];
  dataSource = new MatTableDataSource<PointageVehicule>();
  displayedColumns: string[] = ['index', 'vehicule', 'modele', 'carburant', 'date', 'action'];
  message = "";
  filterTerm = "";

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: PointageService, private cdRef: ChangeDetectorRef,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.service.liste().subscribe({
      next: (data: any) => {
        this.pointages = data.pointage && data.pointage.length > 0 ? data.pointage : [];
        this.dataSource.data = [...this.pointages];
        this.message = data.message;
      },
      error: err => console.error('Erreur lors du chargement des données :', err)
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
    this.sort.active = 'date';
    this.sort.direction = 'desc';
    this.cdRef.detectChanges();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterTerm = filterValue;
    this.dataSource.filter = filterValue;

    this.dataSource.filterPredicate = (data: PointageVehicule, filter: string) => {
      const immatriculation = data.vehicule.immatriculation.toLowerCase();
      const datePointage = data.date ? new Date(data.date).toLocaleDateString().toLowerCase() : '';

      return immatriculation.includes(filter) || datePointage.includes(filter);
    };
  }

  supprimer(id: number): void {
    const dialogRef=this.dialog.open(
      SupprimerPointageComponent,{width:"500",maxWidth:600,data:{id}}
    )
    dialogRef.afterClosed().subscribe(resultat => {
      if (resultat === 'confirm') {
        this.service.liste().subscribe({
          next: (data: any) => {
            this.pointages = data.pointage && data.pointage.length > 0 ? data.pointage : [];
            this.dataSource.data = [...this.pointages];
            this.message = data.message;
          },
          error: err => console.error('Erreur lors du chargement des données :', err)
        });
      }
    })
  }
}
