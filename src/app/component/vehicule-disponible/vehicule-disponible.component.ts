import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';

import { Vehicule } from '../../modeles/Vehicule';
import { VehiculeService } from '../../services/vehicule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Carburant } from '../../modeles/Carburant';
import { ModifierVehiculeComponent } from '../modifier-vehicule/modifier-vehicule.component';

@Component({
  selector: 'app-vehicule-disponible',
  standalone: true,
  providers: [DatePipe],
  imports: [
    MatTableModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule, MatSnackBarModule, MatDialogModule,
    NgForOf, NgIf
  ],
  templateUrl: './vehicule-disponible.component.html',
  styleUrls: ['./vehicule-disponible.component.css']
})
export class VehiculeDisponibleComponent implements OnInit {

  date: string = '';
  vehicules: Vehicule[] = [];
  filtrevehicules: Vehicule[] = [];
  filterTerm: string = '';
  message: string = '';

  constructor(
    private service: VehiculeService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.chargerVehicules();
  }

  chargerVehicules() {
    this.service.vehiculeDispo().subscribe({
      next: (data: any) => {
        if (data.vehicule) {
          this.vehicules = data.vehicule;
          this.filtrevehicules = [...this.vehicules];
        }else{
          this.vehicules=[]
          this.filtrevehicules=[]
        }
        this.message = data.message || '';
      },
      error: (err) => {
        console.error();
        this.snackBar.open('Erreur lors de la récupération des véhicules.', 'Fermer', { duration: 3000 });
      }
    });
  }

  modifier(vehicule: Vehicule) {
    const dialogRef = this.dialog.open(ModifierVehiculeComponent, {
      width: '900px',
      height: 'auto',
      data: {
        vehicule: {vehicule}
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.chargerVehicules();
        }
      },
      error: (err) => {
        console.error();
        this.snackBar.open('Une erreur est survenue lors de la modification du véhicule.', 'Fermer', { duration: 3000 });
      }
    });
  }

  convertStringToDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  filterVehicules() {
    if (this.filterTerm.trim()) {
      this.filtrevehicules = this.vehicules.filter(
        vehicule =>
          vehicule.modele.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
          vehicule.immatriculation.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
          (vehicule.commentaire && vehicule.commentaire.toLowerCase().includes(this.filterTerm.toLowerCase()))
      );
    } else {
      this.filtrevehicules = [...this.vehicules];
    }
  }

  getTotalCarburant(carburants: Carburant[] | null | undefined): number {
    return (carburants ?? []).reduce((total, carburant) => total + carburant.approv, 0);
  }
}
