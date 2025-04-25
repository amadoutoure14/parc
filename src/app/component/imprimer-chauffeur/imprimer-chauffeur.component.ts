import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {ChauffeurService} from '../../services/chauffeur.service';
import {Chauffeur} from '../../modeles/Chauffeur';
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
import {MatPaginator} from '@angular/material/paginator';
import {ModifierChauffeurComponent} from '../modifier-chauffeur/modifier-chauffeur.component';
import {SupprimerChauffeurComponent} from '../supprimer-chauffeur/supprimer-chauffeur.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-imprimer-chauffeur',
  standalone: true,
  providers: [DatePipe],
  imports: [
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
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
    MatTable,
    NgOptimizedImage,
    MatHeaderCellDef,
    MatNoDataRow
  ],
  templateUrl: './imprimer-chauffeur.component.html',
  styleUrl: './imprimer-chauffeur.component.css'
})
export class ImprimerChauffeurComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'nom','telephone','actions'];
  message=""
  constructor(private service:ChauffeurService, private dialog:MatDialog) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  chauffeurs: Chauffeur[] = [];
  debut!: Date;
  fin!: Date;
  dataSource=new MatTableDataSource<Chauffeur>();
  ngOnInit(): void {
    this.service.listeChauffeur().subscribe({
      next: data => {
       this.dataSource.data= data.chauffeur
        this.dataSource.paginator=this.paginator;
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
  rechercher(debut: Date,fin: Date) {
    if (!debut && !fin) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    this.service.filtreChauffeurDate(debut,fin).subscribe({
      next: (data) => {
        this.chauffeurs = data.chauffeur;
        this.dataSource.paginator=this.paginator;
      },
    });
  }

  modifier(chauffeur: Chauffeur): void {
    const dialogRef = this.dialog.open(ModifierChauffeurComponent, {
      width: "700px",
      height: "385px",
      data: { chauffeur }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result==="confirm") {
        this.service.listeChauffeur().subscribe({
          next: (data) => {
            this.dataSource.data =  data.chauffeur;
            this.message = data.message
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = (chauffeur: Chauffeur, filter: string): boolean => {
              const term = filter.trim().toLowerCase();
              return (
                chauffeur.nom_complet?.toLowerCase().includes(term) ||
                chauffeur.telephone?.toLowerCase().includes(term)
              );
            };
          }
        });
      }
    });
  }

  supprimer(chauffeur:Chauffeur){
    const dialogRef = this.dialog.open( SupprimerChauffeurComponent, {
      width: "520px",
      maxWidth: "600px",
      data: { chauffeur }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result==="confirm") {
        this.service.listeChauffeur().subscribe({
          next: (data) => {
            this.dataSource.data =  data.chauffeur;
            this.message = data.message
            this.dataSource.paginator = this.paginator;
            this.dataSource.filterPredicate = (chauffeur: Chauffeur, filter: string): boolean => {
              const term = filter.trim().toLowerCase();
              return (
                chauffeur.nom_complet?.toLowerCase().includes(term) ||
                chauffeur.telephone?.toLowerCase().includes(term)
              );
            };
          }
        });
      }
    });
  }
}
