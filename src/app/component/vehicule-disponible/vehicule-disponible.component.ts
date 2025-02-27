import {Component, OnInit} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Carburant} from '../../modeles/Carburant';

import {window} from 'rxjs';
import {ModifierVehiculeComponent} from '../modifier-vehicule/modifier-vehicule.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-vehicule-disponible',
  standalone: true,
  providers:[DatePipe],
  imports: [MatTableModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule, NgForOf, NgIf, NgClass],
  templateUrl: './vehicule-disponible.component.html',
  styleUrls: ['./vehicule-disponible.component.css']
})
export class VehiculeDisponibleComponent implements OnInit{

  date: string = '';
  vehicules: Vehicule[] = [];
  filtrevehicules: Vehicule[] = [];
  filterTerm = '';

  constructor(private service: VehiculeService,private datePipe:DatePipe, public dialog: MatDialog, private snackBar:MatSnackBar) { }
  modifier(vehicule: Vehicule) {
    const debutLocationDate = vehicule.debut_location ? this.convertStringToDate(vehicule.debut_location) : null;
    const finLocationDate = vehicule.fin_location ? this.convertStringToDate(vehicule.fin_location) : null;

    const formattedDebutLocation = debutLocationDate ? this.datePipe.transform(debutLocationDate, "yyyy-MM-dd") : '';
    const formattedFinLocation = finLocationDate ? this.datePipe.transform(finLocationDate, "yyyy-MM-dd") : '';

    const dialogRef = this.dialog.open(
      ModifierVehiculeComponent, {
      width: '900px',
      height: 'auto',
      data: {
        vehicule: {
          ...vehicule,
          debut_location: formattedDebutLocation,
          fin_location: formattedFinLocation
        }
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        // Relance la requête pour mettre à jour la liste des véhicules
        this.service.vehiculeDispo().subscribe({
          next: (data: any) => {
            if (data && data.vehicule) {
              this.vehicules = data.vehicule;
              this.filtrevehicules = [...this.vehicules];
              this.snackBar.open(data.message, 'Fermer', { duration: 3000 });
            } else {
              // Gérer le cas où les données sont vides ou mal formées
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

  ngOnInit(): void {
    this.service.vehiculeDispo().subscribe({
      next: (data) => {
        this.vehicules = data.vehicule;
        this.filtrevehicules=this.vehicules
        this.snackBar.open(data.message,'Fermer',{duration:3000})
      },
      error: (data) => {
        this.snackBar.open(data.message, 'Fermer', { duration: 3000 });
      }
    })
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
}
