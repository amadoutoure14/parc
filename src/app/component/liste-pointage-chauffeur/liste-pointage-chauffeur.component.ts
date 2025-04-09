import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatInput} from "@angular/material/input";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {PointageChauffeurService} from '../../services/pointage-chauffeur.service';
import {PointageChauffeur} from '../../modeles/PointageChauffeur';
import {MatIconButton} from "@angular/material/button";
import {MatDialog} from '@angular/material/dialog';
import {SupprimerPointageChaffeurComponent} from '../supprimer-pointage-chaffeur/supprimer-pointage-chaffeur.component';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-liste-pointage-chauffeur',
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatNoDataRow,
    MatHeaderCellDef,
    MatIconButton,
    NgIf,
    MatPaginator,
    NgOptimizedImage
  ],
  templateUrl: './liste-pointage-chauffeur.component.html',
  styleUrl: './liste-pointage-chauffeur.component.css'
})
export class ListePointageChauffeurComponent implements OnInit {
  pointages: PointageChauffeur[] = [];
  dataSource = new MatTableDataSource<PointageChauffeur>();
  displayedColumns: string[] = ['index', 'chauffeur', 'telephone', 'date', 'supprimer'];
  message = "";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private service: PointageChauffeurService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.liste().subscribe({
      next: (data: any) => {
        this.dataSource.data = data.pointage;
        this.dataSource.paginator=this.paginator ;
        this.sort.active='date'
        this.sort.direction='desc'
        this.dataSource.sort=this.sort;

        this.message = data.message || '';
      }
    });

    this.dataSource.filterPredicate = (data: PointageChauffeur, filter: string) => {
      const terme = filter.toLowerCase();
      const nom = data.chauffeur.nom_complet?.toLowerCase() || '';
      const tel = data.chauffeur.telephone?.toLowerCase() || '';
      const date = data.date ? new Date(data.date).toLocaleDateString().toLowerCase() : '';

      return nom.includes(terme) || tel.includes(terme) || date.includes(terme);
    };

    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'date') {
        return new Date(item.date).getTime();
      }
      return (item as any)[property] ?? '';
    };
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  supprimer(id: number): void {
    const dialogRef = this.dialog.open(SupprimerPointageChaffeurComponent, {
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

