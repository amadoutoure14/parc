import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
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
    MatTable,
    MatNoDataRow,
    MatHeaderCellDef,
    MatIconButton,
    NgIf,
    MatPaginator,
    NgOptimizedImage,
    MatSortHeader
  ],
  templateUrl: './liste-pointage-chauffeur.component.html',
  styleUrl: './liste-pointage-chauffeur.component.css'
})
export class ListePointageChauffeurComponent implements OnInit {
  dataSource = new MatTableDataSource<PointageChauffeur>();
  displayedColumns: string[] = ['index', 'chauffeur', 'telephone', 'date', 'supprimer'];
  message = "";
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: PointageChauffeurService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.liste().subscribe({
      next: (data: any) => {
        this.dataSource.data = data.pointage;
        this.message = data.message || '';
        this.dataSource.paginator = this.paginator;
        this.sort.active = 'date';
        this.sort.direction = 'desc';
        this.sort.sortChange.emit({active: 'date', direction: 'desc'});
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: PointageChauffeur, filter: string) => {
          const terme = filter.toLowerCase();
          const nom = data.chauffeur.nom_complet?.toLowerCase() || '';
          const tel = data.chauffeur.telephone?.toLowerCase() || '';
          const date = data.date ? new Date(data.date).toLocaleDateString().toLowerCase() : '';

          return nom.includes(terme) || tel.includes(terme) || date.includes(terme);
        };
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  supprimer(id: number): void {
    const dialogRef = this.dialog
      .open(SupprimerPointageChaffeurComponent, {
      width: "500px",
      maxWidth: "600px",
      data: { id }
    });

    dialogRef.afterClosed().subscribe(resultat => {
      if (resultat === 'confirm') {
        this.service.liste().subscribe({
          next: (data: any) => {
            this.dataSource.data =data.pointage;
            this.message = data.message || '';
          }
        });
      }
    });
  }
}

