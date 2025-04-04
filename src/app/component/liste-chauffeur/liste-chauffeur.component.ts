import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
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
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-liste-chauffeur',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatInput,
    MatPaginator,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatSortHeader,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatTable,
    MatSort,
    MatButton
  ],
  templateUrl: './liste-chauffeur.component.html',
  styleUrl: './liste-chauffeur.component.css'
})
export class ListeChauffeurComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['numero', 'nom_complet', 'permis', 'telephone', 'actions'];
  dataSource = new MatTableDataSource<Chauffeur>();
  filterTerm: string = '';
  message: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ChauffeurService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.listeChauffeur().subscribe({
      next: (data) => {
        const chauffeurs = data.chauffeur || [];
        this.dataSource.data = chauffeurs;
        this.message = chauffeurs.length ? '' : (data.message || 'Aucun chauffeur trouvé.');
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(): void {
    this.dataSource.filter = this.filterTerm.trim().toLowerCase();
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
          this.dataSource.data = [...this.dataSource.data]; // for trigger
        }
      }
    });
  }
}

