import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChauffeurService} from '../../services/chauffeur.service';
import {Chauffeur} from '../../modeles/Chauffeur';
import {PointageChauffeurService} from '../../services/pointage-chauffeur.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-pointage-chauffeur-formulaire',
  imports: [
    MatButton,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatInput,
    MatNoDataRow
  ],
  templateUrl: './pointage-chauffeur-formulaire.component.html',
  styleUrl: './pointage-chauffeur-formulaire.component.css'
})
export class PointageChauffeurFormulaireComponent implements OnInit {
  date!: Date | null;
  dataSource: MatTableDataSource<Chauffeur[]>;
  columnsToDisplay = ['nom','tel','pointer','soumettre'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private chauffeurService: ChauffeurService,
    private snackBar: MatSnackBar,
    private service: PointageChauffeurService
  ) {}

  ngOnInit(): void {
    this.chauffeurService.listeChauffeur().subscribe({
      next: (data: any) => {
         this.dataSource = new MatTableDataSource(data.chauffeur);
         this.dataSource.paginator = this.paginator
        this.snackBar.open(data.message, "Fermer", { duration: 3000 });
      }
    });
  }

  submit(chauffeur: Chauffeur) {
    if (chauffeur.cocher && this.date) {
      this.service.pointer(this.date, chauffeur.id).subscribe({
        next: (data: any) => {
          chauffeur.cocher = false;
          this.snackBar.open(data.message, "Fermer", { duration: 3000 });
        },
        error: (err) => {
          const errorMessage = err.error?.message || "Une erreur est survenue";
          this.snackBar.open(errorMessage, "Fermer", { duration: 3000 });
          chauffeur.cocher=false
        }
      });
    }
  }
  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
