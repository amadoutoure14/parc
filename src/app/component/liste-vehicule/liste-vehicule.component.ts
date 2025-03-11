import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {Carburant} from '../../modeles/Carburant';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ModifierVehiculeComponent} from '../modifier-vehicule/modifier-vehicule.component';

@Component({
  selector: 'app-liste-vehicule',
  templateUrl: './liste-vehicule.component.html',
  imports: [
    FormsModule,
    MatInput,
    MatIconButton,
    NgClass,
    NgIf,
    NgForOf,
  ],
  providers:[DatePipe],
  styleUrls: ['./liste-vehicule.component.css']
})
export class ListeVehiculeComponent implements OnInit {
  vehicules: Vehicule[] = [];
  filtrevehicules: Vehicule[] = [];
  filterTerm = '';
   message="";

  constructor(private snackBar: MatSnackBar, private service: VehiculeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.listeVehicule().subscribe({
      next: data => {
        if (data.vehicule && data.vehicule.length > 0) {
          this.vehicules = data.vehicule;
          this.filtrevehicules = [...this.vehicules];
          this.message=data.message;
        } else {
          this.vehicules = [];
          this.filtrevehicules = [];
          this.message=data.message;
        }
      }
    });
  }


  filterVehicules() {
    if (this.filterTerm) {
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


  modifier(vehicule: Vehicule) {

    const dialogRef = this.dialog.open(ModifierVehiculeComponent, {
      width: '900px',
      height: 'auto',
      data: {vehicule}
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.service.listeVehicule().subscribe({
          next: (data: any) => {
            if (data && data.vehicule) {
              this.vehicules = data.vehicule;
              this.filtrevehicules = [...this.vehicules];
            } else {
              this.snackBar.open('Erreur lors de la récupération des véhicules.', 'Fermer', { duration: 3000 });
            }
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open('Une erreur s\'est produite lors de la récupération des véhicules.', 'Fermer', { duration: 3000 });
          }
        });
      },
      error: (err) => {
        console.log('Erreur lors de la fermeture du dialogue', err);
        this.snackBar.open('Une erreur est survenue lors de la modification du véhicule.', 'Fermer', { duration: 3000 });
      }
    });
  }

  convertStringToDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }


}

