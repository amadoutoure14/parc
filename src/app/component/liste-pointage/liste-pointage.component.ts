import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PointageService} from '../../services/pointage.service';
import {PointageVehicule} from '../../modeles/PointageVehicule';
import {DatePipe} from '@angular/common';
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
    MatSort
  ],
  templateUrl: './liste-pointage.component.html',
  styleUrl: './liste-pointage.component.css'
})
export class ListePointageComponent implements OnInit, AfterViewInit {
  pointages: PointageVehicule[] = [];
  dataSource = new MatTableDataSource<PointageVehicule>();
  displayedColumns: string[] = ['index', 'vehicule','modele', 'date'];
  message = "";
  filterTerm = "";

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: PointageService) {}

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
    this.sort.active = 'date';
    this.sort.direction = 'asc';
    this.sort.sortChange.emit();
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterTerm = filterValue;
    this.dataSource.filter = filterValue;

    this.dataSource.filterPredicate = (data: PointageVehicule, filter: string) => {
      const immatriculation = data.vehicule.immatriculation.toLowerCase();
      const datePointage = data.date ? new Date(data.date).toLocaleDateString().toLowerCase() : '';

      return immatriculation.includes(filter) || datePointage.includes(filter);
    };
  }

}
