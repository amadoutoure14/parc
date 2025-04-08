import {Component, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {ModifierVehiculeComponent} from '../modifier-vehicule/modifier-vehicule.component';
import {MatButton} from '@angular/material/button';
import {DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-liste-vehicule',
  templateUrl: './liste-vehicule.component.html',
  imports: [
    MatPaginator,
    MatPaginatorModule,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    NgOptimizedImage,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    DatePipe,
    MatTable,
    MatInput,
    NgIf
  ],
  styleUrls: ['./liste-vehicule.component.css']
})
export class ListeVehiculeComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'immatriculation', 'modele', 'commentaire', 'date', 'actions'];
  message: string = '';
  dataSource= new MatTableDataSource<Vehicule>();

  constructor(private service: VehiculeService, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.service.listeVehicule().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Vehicule>(data.vehicule);
        this.dataSource.filterPredicate = (vehicule: Vehicule, filter: string): boolean => {
          const dateStr = vehicule.date ? new Date(vehicule.date).toLocaleDateString('fr-FR') : '';
          const term = filter.trim().toLowerCase();
          return (
            vehicule.immatriculation?.toLowerCase().includes(term) ||
            vehicule.modele?.toLowerCase().includes(term) ||
            vehicule.commentaire?.toLowerCase().includes(term) ||
            dateStr.toLowerCase().includes(term)
          );
        };
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  /*
   {

  vehicules: Vehicule[]=[];
  displayedColumns: string[] = ['numero', 'immatriculation', 'modele', 'commentaire', 'date', 'actions'];
  dataSource=new MatTableDataSource<Vehicule>(this.vehicules);
  message: string = '';

@ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private service: VehiculeService, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.service.listeVehicule().subscribe({
      next: (data) => {
        this.dataSource.data=data.vehicule
        this.vehicules = data.vehicule
        this.dataSource.filterPredicate = (data: Vehicule, filter: string): boolean => {
          const dateStr = data.date ? new Date(data.date).toLocaleDateString('fr-FR') : '';
          const term = filter.trim().toLowerCase();
          return (
            data.immatriculation?.toLowerCase().includes(term) ||
            data.modele?.toLowerCase().includes(term) ||
            data.commentaire?.toLowerCase().includes(term) ||
            dateStr.toLowerCase().includes(term)
          );
        };
        this.message = data.message;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
   */

