import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {DatePipe, NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ModifierVehiculeComponent} from '../modifier-vehicule/modifier-vehicule.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-liste-vehicule',
  templateUrl: './liste-vehicule.component.html',
  imports: [
    FormsModule,
    MatInput,
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatSortModule,
    MatButton,
    MatHeaderRowDef,
    DatePipe,
    MatSort,
    MatPaginator,
    MatFormField,
    MatNoDataRow
  ],
  providers:[DatePipe],
  styleUrls: ['./liste-vehicule.component.css']
})
export class ListeVehiculeComponent implements OnInit, AfterViewInit {
  vehicules: Vehicule[] = [];
  displayedColumns: string[] = ['numero', 'immatriculation', 'modele', 'commentaire', 'date', 'actions'];
  dataSource = new MatTableDataSource<Vehicule>();
  filterTerm: string = '';
  message: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: VehiculeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.listeVehicule().subscribe({
      next: (data) => {
        if (data.vehicule.length > 0) {
          this.vehicules = data.vehicule;
          this.dataSource = new MatTableDataSource(this.vehicules);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = (data: Vehicule, filter: string): boolean => {
            const term = filter.trim().toLowerCase();
            return (
              data.immatriculation?.toLowerCase().includes(term) ||
              data.modele?.toLowerCase().includes(term) ||
              data.commentaire?.toLowerCase().includes(term)
            );
          };
          this.message = data.message;
        } else {
          this.dataSource.data = [];
          this.message = data?.message || 'Aucun véhicule trouvé.';
        }
      },
      error: () => {
        this.message = 'Erreur lors de la récupération des véhicules.';
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(term: string): void {
    this.dataSource.filter = term.trim().toLowerCase();
  }

  modifier(vehicule: Vehicule): void {
    const dialogRef = this.dialog.open(ModifierVehiculeComponent, {
      width: '900px',
      height: 'auto',
      data: { vehicule }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex((v) => v.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data];
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }
}
