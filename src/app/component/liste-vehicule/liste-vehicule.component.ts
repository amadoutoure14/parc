import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {Carburant} from '../../modeles/Carburant';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
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
    MatIcon,
    MatIconButton,
    NgClass,
    NgIf,
    NgForOf
  ],
  providers:[DatePipe],
  styleUrls: ['./liste-vehicule.component.css']
})
export class ListeVehiculeComponent implements OnInit {
  vehicules: Vehicule[] = [];
  filtrevehicules: Vehicule[] = [];
  filterTerm = '';

  constructor(private snackBar: MatSnackBar, private service: VehiculeService, public dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.service.listeVehicule().subscribe({
      next: (data: any) => {
        this.vehicules = data.vehicule;
        this.filtrevehicules = [...this.vehicules];
        this.snackBar.open(data.message, 'Fermer', { duration: 3000 });
      },
      error: (err) => {
        console.log(err);
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
    // Vérifier que les dates ne sont pas undefined avant de les convertir
    const debutLocationDate = vehicule.debut_location ? this.convertStringToDate(vehicule.debut_location) : null;
    const finLocationDate = vehicule.fin_location ? this.convertStringToDate(vehicule.fin_location) : null;

    // Formater les dates en "yyyy-MM-dd" si elles ne sont pas nulles
    const formattedDebutLocation = debutLocationDate ? this.datePipe.transform(debutLocationDate, "yyyy-MM-dd") : '';
    const formattedFinLocation = finLocationDate ? this.datePipe.transform(finLocationDate, "yyyy-MM-dd") : '';

    const dialogRef = this.dialog.open(ModifierVehiculeComponent, {
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Modifications enregistrées:', result);
      }
    });
  }

  convertStringToDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day)); // Création d'un objet Date
  }


}

