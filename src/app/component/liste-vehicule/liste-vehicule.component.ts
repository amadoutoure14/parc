import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell, MatCellDef,
  MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {ModifierVehiculeComponent} from '../modifier-vehicule/modifier-vehicule.component';
import {MatDialog} from '@angular/material/dialog';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-liste-vehicule',
  templateUrl: './liste-vehicule.component.html',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgOptimizedImage,
    MatButton,
    MatInput,
    MatNoDataRow,
    NgClass,
  ],
  styleUrls: ['./liste-vehicule.component.css']
})
export class ListeVehiculeComponent implements OnInit,AfterViewInit {

  constructor(private  service: VehiculeService, private dialog: MatDialog) { }

  dataSource= new MatTableDataSource<Vehicule>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[]=['num','vehicule','modele','commentaire','sortie','modifier'];
  message="";

  ngOnInit(): void {
    this.service.listeVehicule().subscribe({
      next: data => {
        this.dataSource.data = data.vehicule;
        this.dataSource.paginator = this.paginator;
        this.message=data.message;
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator
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
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
