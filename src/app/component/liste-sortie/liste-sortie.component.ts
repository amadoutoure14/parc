import {  Component, OnInit, ViewChild} from '@angular/core';
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
import {MatSort, MatSortHeader} from '@angular/material/sort';
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
    MatNoDataRow,
    MatPaginator,
    MatSortHeader
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './liste-sortie.component.html',
  styleUrl: './liste-sortie.component.css'
})
export class ListeSortieComponent implements OnInit {
  message = "";
  dataSource = new MatTableDataSource<Sortie>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['status', 'chauffeur', 'vehicule', 'objet', 'depart', 'destination', 'debut', 'fin', 'duree', 'modifier'];

  constructor(private service: SortieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.listeSortie().subscribe({
      next: data => {
        this.dataSource.data = data.sortie;
        this.dataSource.paginator=this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'debut':
              return new Date(item.date_debut);
            case 'chauffeur':
              return item.affectation.chauffeur.nom_complet.toLowerCase();
            case 'vehicule':
              return item.affectation.vehicule.immatriculation.toLowerCase();
            default:
              return item[property];
          }
        };
        this.sort.active='debut'
        this.sort.direction='desc'
        this.sort.start='desc'
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Sortie, filter: string) => {
          const term = filter.toLowerCase();
          const chauffeur = data.affectation.chauffeur.nom_complet.toLowerCase();
          const vehicule = data.affectation.vehicule.immatriculation.toLowerCase();
          const destination = data.destination.toLowerCase();
          const depart = data.lieu_depart.toLowerCase();
          return chauffeur.includes(term) || vehicule.includes(term) || destination.includes(term) || depart.includes(term);
        };
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
    const dialogRef = this.dialog.open(ModifierSortieComponent, {
      width: '95vw',
      height: '92vh',
      data: { sortie }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
        this.dataSource._updateChangeSubscription();
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
