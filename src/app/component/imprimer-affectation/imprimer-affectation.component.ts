import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {Affectation} from '../../modeles/Affectation';
import {AffectationService} from '../../services/affectation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatInput} from '@angular/material/input';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {ModifierAffectationComponent} from '../modifier-affectation/modifier-affectation.component';
import {SupprimerAffectationComponent} from '../supprimer-affectation/supprimer-affectation.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-imprimer-affectation',
  imports: [
    FormsModule,
    MatButton,
    MatIcon,
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatInput,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSortHeader,
    MatTable,
    NgOptimizedImage,
    MatHeaderCellDef,
    MatNoDataRow,
    MatSort
  ],
  templateUrl: './imprimer-affectation.component.html',
  styleUrl: './imprimer-affectation.component.css'
})

export class ImprimerAffectationComponent implements OnInit {
  dataSource=new MatTableDataSource<Affectation>();
  debut!: Date;
  fin!: Date;
  message="";
@ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[]=['numero','chauffeur','telephone','immatriculation','date','modifier'];
  constructor(private service: AffectationService, private snackBar: MatSnackBar,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.chargerAffectations();
  }
  private chargerAffectations(): void {
    this.service.listeAffectations().subscribe({
      next: (data) => {
        this.message=data.message
        this.dataSource.data = data.affectation;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
          const immat = data.vehicule?.immatriculation?.toLowerCase() || '';
          const telephone = data.chauffeur?.telephone?.toLowerCase() || '';
          const nom = data.chauffeur?.nom_complet?.toLowerCase() || '';
          const dateStr = data.date ? new Date(data.date).toLocaleDateString('fr-FR') : '';
          return immat.includes(filter) || dateStr.includes(filter)||nom.includes(filter)||telephone.includes(filter);
        };
      }
    });
  }
  rechercher(debut: Date, fin: Date) {
    this.service.dateAffectation(debut, fin).subscribe({
      next: value => {
        if (value.length === 0) {
          this.snackBar.open('Aucune affectation trouvée pour cette période.', 'Fermer', { duration: 3000 });
        } else {
          this.dataSource.data = value.affectation;
        }
      },
      error: error => {
        this.snackBar.open("Une erreur est survenue de type " + error.message, 'Fermer', { duration: 3000 });
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

  supprimer(affectation:Affectation)  {
    const dialogRef = this.dialog.open( SupprimerAffectationComponent, {
      width: "520px",
      maxWidth: "600px",
      data: { affectation }
    });
    dialogRef.afterClosed().subscribe(resultat => {
      if (resultat==="resultat") {
        this.chargerAffectations();
      }
    });
  }
}
