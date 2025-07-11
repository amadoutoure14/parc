import {Component, OnInit, ViewChild} from '@angular/core';
import {VehiculeService} from '../../services/vehicule.service';
import {Vehicule} from '../../modeles/Vehicule';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PointageVehiculeService} from '../../services/pointage-vehicule.service';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatInput} from '@angular/material/input';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-pointage-formulaire',
  imports: [
    FormsModule,
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatRowDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatButton,
    NgIf,
    MatInput,
    MatPaginator,
    MatNoDataRow,
  ],
  templateUrl: './pointage-vehicule-formulaire.component.html',
  styleUrl: './pointage-vehicule-formulaire.component.css'
})
export class PointageVehiculeFormulaireComponent implements OnInit {

  date!: Date|null;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['immatriculation','modele','pointer','soumettre'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private VehiculeService: VehiculeService, private snackBar: MatSnackBar, private service: PointageVehiculeService) {}

  ngOnInit(): void {

    this.VehiculeService.listeVehicule().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.vehicule);
        this.dataSource.paginator = this.paginator;
        this.snackBar.open(data.message, "Fermer", { duration: 3000 });
      }
    });

  }

  submit(vehicule: Vehicule) {
    if (vehicule.cocher) {
      this.service.pointer(this.date, vehicule.id).subscribe({
        next: (data: any) => {
          vehicule.cocher = false;
          this.snackBar.open(data.message, "Fermer", { duration: 3000 });
        },
        error: (err) => {
          const errorMessage = err.error?.message || "Une erreur est survenue";
          this.snackBar.open(errorMessage, "Fermer", { duration: 3000 });
        }
      });
    }
  }


  resetDate(vehicule: Vehicule) {
    if (!vehicule.cocher) {
      this.date = null;
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
