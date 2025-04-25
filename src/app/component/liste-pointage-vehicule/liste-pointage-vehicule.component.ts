import {Component, OnInit, ViewChild} from '@angular/core';
import {PointageVehiculeService} from '../../services/pointage-vehicule.service';
import {PointageVehicule} from '../../modeles/PointageVehicule';
import {DatePipe, NgOptimizedImage} from '@angular/common';
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
import {SupprimerPointageVehiculeComponent} from '../supprimer-pointage-vehicule/supprimer-pointage-vehicule.component';
import {MatPaginator} from '@angular/material/paginator';
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
    MatSortHeader,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatSort,
    MatPaginator,
    DatePipe,
    MatInput,
    MatIconButton,
    NgOptimizedImage
  ],
  templateUrl: './liste-pointage-vehicule.component.html',
  styleUrl: './liste-pointage-vehicule.component.css'
})
export class ListePointageVehiculeComponent implements OnInit {

  pointages: PointageVehicule[] = [];
  dataSource = new MatTableDataSource<PointageVehicule>();
  displayedColumns: string[] = ['num','immatriculation','modele','date','supprimer'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  message = "";

  constructor(private service: PointageVehiculeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.liste().subscribe({
      next: (data: any) => {
        this.dataSource.data =data.pointage
        this.dataSource.paginator=this.paginator
        this.sort.active='date'
        this.sort.direction='desc'
        this.dataSource.sort = this.sort;
        this.message = data.message || '';
      }
    });

    this.dataSource.filterPredicate = (data: PointageVehicule, filter: string) => {
      const term = filter.toLowerCase();
      const immatriculation = data.vehicule.immatriculation?.toLowerCase() || '';
      const date = data.date ? new Date(data.date).toLocaleDateString('FR-fr').toLowerCase() : '';
      return immatriculation.includes(term) || date.includes(term) ;
    };

    this.dataSource.sortingDataAccessor = (item: PointageVehicule, property: string) => {
      if (property === 'date') {
        return new Date(item.date).getTime();
      }
      return (item as any)[property] ?? '';
    };
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
            this.pointages = data.pointage || [];
            this.dataSource.data = [...this.pointages];
            this.message = data.message || '';
          }
        });
      }
    });
  }
}

