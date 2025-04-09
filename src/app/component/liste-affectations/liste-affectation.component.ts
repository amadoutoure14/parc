import {Component, OnInit, ViewChild,} from '@angular/core';
import {Affectation} from '../../modeles/Affectation';
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {AffectationService} from '../../services/affectation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ModifierAffectationComponent} from '../modifier-affectation/modifier-affectation.component';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-liste-affectations',
  imports: [
    FormsModule,
    MatInput,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef, MatSortModule,
    MatCell, MatTable, MatButton, NgOptimizedImage, DatePipe, MatPaginator
  ],
  templateUrl: './liste-affectation.component.html',
  styleUrl: './liste-affectation.component.css'
})
export class ListeAffectationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  message = "";
  displayedColumns: string[]=['numero','chauffeur','telephone','immatriculation','date','modifier'];
  dataSource= new MatTableDataSource<Affectation>;

  constructor(private service: AffectationService, private snackBar: MatSnackBar, private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.chargerAffectations();
  }
  private chargerAffectations(): void {
    this.service.listeAffectations().subscribe({
      next: (data) => {
        this.message=data.message
        this.dataSource.data = data.affectation;
        this.dataSource.paginator = this.paginator;
        this.sort.active='date'
        this.sort.direction='desc'
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data, filter) => {
          const immat = data.vehicule?.immatriculation?.toLowerCase() || '';
          const telephone = data.chauffeur?.telephone?.toLowerCase() || '';
          const nom = data.chauffeur?.nom_complet?.toLowerCase() || '';
          const dateStr = data.date ? new Date(data.date).toLocaleDateString('fr-FR') : '';
          return immat.includes(filter) || dateStr.includes(filter)||nom.includes(filter)||telephone.includes(filter);
        };
      },
      error: () => {
        this.snackBar.open("Erreur lors du chargement des affectations", "Fermer", { duration: 3000 });
      }
    });
  }


  modifier(affectation: Affectation): void {
    const dialogRef = this.dialog.open(ModifierAffectationComponent, {
      data: affectation,
      width: "800px",
      height: "530px"
    });

    dialogRef.afterClosed().subscribe(resultat => {
      if (resultat==="resultat") {
        this.chargerAffectations();
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
}
