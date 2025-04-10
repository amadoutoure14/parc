import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgClass, NgOptimizedImage} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {ModifierSortieComponent} from '../modifier-sortie/modifier-sortie.component';
import {MatDialog} from '@angular/material/dialog';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-liste-sortie',
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    NgClass,
    MatButton,
    NgOptimizedImage,
    DatePipe,
    MatInput,
    MatNoDataRow
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './liste-sortie.component.html',
  styleUrl: './liste-sortie.component.css'
})
export class ListeSortieComponent implements OnInit {

  message="";
  dataSource=new MatTableDataSource<Sortie>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['status','chauffeur','vehicule','objet','depart','destination','debut','fin','duree','modifier'];
  constructor(private service: SortieService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.service.listeSortie().subscribe({
      next: data => {
        this.dataSource.data=data.sortie

        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      }
    });
  }

  getStatusText(status: boolean): string {
    return status ? 'En cours' : 'Terminée';
  }

  getStatusClass(status: boolean): string {
    return status ? 'bg-vert' : 'bg-rouge';
  }

  modifier(sortie: Sortie): void {
    const dialogRef = this.dialog.open(
      ModifierSortieComponent, {
        width: '95vw',
        height: '92vh',
        data: { sortie }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
        this.dataSource._updateChangeSubscription()
      }
    });
  }

  applyFilter($event: KeyboardEvent) {

  }
}
