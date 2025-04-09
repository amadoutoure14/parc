import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Carburant} from '../../modeles/Carburant';
import {CarburantService} from '../../services/carburant.service';
import {MatDialog} from '@angular/material/dialog';
import {ModifierCarburantComponent} from '../modifier-carburant/modifier-carburant.component';
import {SuppressionCarburantComponent} from '../suppression-carburant/suppression-carburant.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-liste-carburant',
  imports: [
    FormsModule,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    DatePipe, MatSortModule, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatRow, NgOptimizedImage, MatIconButton, MatPaginator, MatInput, MatNoDataRow,
  ],
  templateUrl: './liste-carburant.component.html',
  styleUrl: './liste-carburant.component.css'
})
export class ListeCarburantComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'immatriculation', 'carburant', 'date', 'actions'];
  dataSource = new MatTableDataSource<Carburant>()
  message!: string;
  @ViewChild(MatPaginator) paginator:MatPaginator
  @ViewChild(MatSort) sort:MatSort
  constructor(private service: CarburantService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  this.liste()
  }

  liste():void{
    this.service.listeApprov().subscribe({
      next: data => {
        this.dataSource.data = data.carburant;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
          const immat = data.vehicule?.immatriculation?.toLowerCase() || '';
          const dateStr = data.date ? new Date(data.date).toLocaleDateString('fr-FR') : '';
          return immat.includes(filter) || dateStr.includes(filter);
        };
        this.sort.active='date'
        this.sort.direction='desc';
        this.dataSource.sort=this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modifier(carburant: Carburant): void {
    const dialogRef = this.dialog.open(ModifierCarburantComponent, {
      data: carburant
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.liste()
      }
    });
  }

  supprimer(carburant: Carburant): void {
    const dialogRef = this.dialog.open( SuppressionCarburantComponent, {
      width: "500px",
      maxWidth: "600px",
      data: { carburant }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.liste()
      }
    });
  }
}
