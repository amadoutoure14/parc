import {Component, OnInit} from '@angular/core';
import {PointageVehiculeService} from '../../services/pointage-vehicule.service';
import {PointageVehicule} from '../../modeles/PointageVehicule';
import {DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
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
    MatHeaderRowDef,
    MatRowDef,
    MatInput,
    MatNoDataRow,
    DatePipe,
    MatSortHeader,
    MatSort,
    MatIconButton,
    MatPaginator,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './liste-pointage-vehicule.component.html',
  styleUrl: './liste-pointage-vehicule.component.css'
})
export class ListePointageVehiculeComponent implements OnInit {
  pointages: PointageVehicule[] = [];
  dataSource = new MatTableDataSource<PointageVehicule>();
  displayedColumns: string[] = ['index', 'vehicule', 'modele', 'date', 'supprimer'];
  message = "";
  filterTerm = "";

  constructor(private service: PointageVehiculeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.liste().subscribe({
      next: (data: any) => {
        this.pointages = data.pointage && data.pointage.length > 0 ? data.pointage : [];
        this.dataSource.data = [...this.pointages];
        this.message = data.message || '';
      }
    });

    this.dataSource.filterPredicate = (data: PointageVehicule, filter: string) => {
      const term = filter.toLowerCase();
      const immatriculation = data.vehicule.immatriculation?.toLowerCase() || '';
      const date = data.date ? new Date(data.date).toLocaleDateString().toLowerCase() : '';
      return immatriculation.includes(term) || date.includes(term);
    };

    this.dataSource.sortingDataAccessor = (item: PointageVehicule, property: string) => {
      if (property === 'date') {
        return new Date(item.date).getTime();
      }
      return (item as any)[property] ?? '';
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterTerm = filterValue;
    this.dataSource.filter = filterValue;

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

