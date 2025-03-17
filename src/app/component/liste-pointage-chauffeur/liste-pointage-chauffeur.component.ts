import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from "@angular/common";
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
import {PointageVehicule} from '../../modeles/PointageVehicule';
import {PointageService} from '../../services/pointage.service';
import {PointageChauffeurService} from '../../services/pointage-chauffeur.service';
import {PointageChauffeur} from '../../modeles/PointageChauffeur';

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
    MatHeaderCellDef
  ],
  templateUrl: './liste-pointage-chauffeur.component.html',
  styleUrl: './liste-pointage-chauffeur.component.css'
})
export class ListePointageChauffeurComponent  implements OnInit, AfterViewInit {
  pointages: PointageChauffeur[] = [];
  dataSource = new MatTableDataSource<PointageChauffeur>();
  displayedColumns: string[] = ['index', 'chauffeur','telephone', 'date'];
  message = "";
  filterTerm = "";

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: PointageChauffeurService) {}

  ngOnInit(): void {
    this.service.liste().subscribe({
      next: (data: any) => {
        this.pointages = data.pointage && data.pointage.length > 0 ? data.pointage : [];
        this.dataSource.data = [...this.pointages];
        this.message = data.message;
      }
    });

    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'date') {
        return new Date(item.date).getTime();
      }
      return item[property];
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.sort.active = 'date';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit();
    });
  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterTerm = filterValue;
    this.dataSource.filter = filterValue;

    this.dataSource.filterPredicate = (data: PointageChauffeur, filter: string) => {
      const nom = data.chauffeur.nom_complet.toLowerCase();
      const date = data.date ? new Date(data.date).toLocaleDateString().toLowerCase() : '';

      return nom.includes(filter) || date.includes(filter);
    };
  }

}
