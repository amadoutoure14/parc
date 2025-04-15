import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ChauffeurService} from '../../services/chauffeur.service';
import {Chauffeur} from '../../modeles/Chauffeur';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog';
import {ModifierChauffeurComponent} from '../modifier-chauffeur/modifier-chauffeur.component';
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
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-liste-chauffeur',
  standalone: true,
  imports: [
    FormsModule,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatTable,
    MatPaginator,
    NgOptimizedImage,
    MatInput,
    MatNoDataRow,
    MatIconButton,
  ],
  templateUrl: './liste-chauffeur.component.html',
  styleUrl: './liste-chauffeur.component.css'
})
export class ListeChauffeurComponent implements OnInit ,AfterViewInit{

  displayedColumns: string[] = ['numero', 'nom','permis','telephone','actions'];
  dataSource = new MatTableDataSource<Chauffeur>();
  message: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service: ChauffeurService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.listeChauffeur().subscribe({
      next: (data) => {
        this.dataSource.data =  data.chauffeur;
        this.message = data.message
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (chauffeur: Chauffeur, filter: string): boolean => {
          const term = filter.trim().toLowerCase();
          return (
            chauffeur.nom_complet?.toLowerCase().includes(term) ||
            chauffeur.permis?.toLowerCase().includes(term) ||
            chauffeur.telephone?.toLowerCase().includes(term)
          );
        };
      },
      error: () => {
        this.message = 'Erreur de connexion avec le serveur.';
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modifier(chauffeur: Chauffeur): void {
    const dialogRef = this.dialog.open(ModifierChauffeurComponent, {
      width: "700px",
      height: "385px",
      data: { chauffeur }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex(c => c.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });
  }

  supprimer(chauffeur) {

  }
}

