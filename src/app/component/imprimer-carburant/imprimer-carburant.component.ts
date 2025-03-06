import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Carburant} from '../../modeles/Carburant';
import {VehiculeService} from '../../services/vehicule.service';
import {Vehicule} from '../../modeles/Vehicule';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {CarburantService} from '../../services/carburant.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ModifierCarburantComponent} from '../modifier-carburant/modifier-carburant.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-rechercher-carburant',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    NgForOf,
    NgIf,
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: './imprimer-carburant.component.html',
  styleUrl: './imprimer-carburant.component.css'
})
export class ImprimerCarburantComponent implements OnInit{
  carburants: Carburant[]=[];

  constructor(private serviceVehicule:VehiculeService,private service:CarburantService,private snackBar:MatSnackBar, public dialog: MatDialog) {
  }
  vehicules: Vehicule[]=[];
  carburantsFiltre: Carburant[]=[];
  vehicule!: Vehicule;

  modifier(carburant: Carburant) {
    const dialogRef = this.dialog.open(ModifierCarburantComponent, { data: carburant });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.listeApprov().subscribe({
          next: (data) => {
            this.carburants = data.carburant || [];
            this.carburantsFiltre = [...this.carburants];
          },
          error: (error) => console.error(error)
        });
      }
    });
  }

  ngOnInit(): void {
    this.serviceVehicule.listeVehicule().subscribe({
      next: data => {
        this.vehicules = data.vehicule;
      }
    })
  }

  rechercherCarburantVehicule(vehicule: Vehicule) {
    this.service.carburantVehicule(vehicule).subscribe({
      next: data => {
        if (data.carburant){
          this.carburantsFiltre = data.carburant;
          this.snackBar.open(`${data.message} pour le véhicule ${vehicule.immatriculation}`,"Fermer",{duration:3000});
        }
        else {
          this.carburants=[];
          this.carburantsFiltre = [];
        }
      },
      error: err => {
        this.snackBar.open(err,"Fermer",{duration:3000});
      }
    })
  }

  imprimer(vehicule: Vehicule) {
    const snackBarRef = this.snackBar.open('Téléchargement en cours...', 'Fermer', { duration: 0 });
    this.service.imprimer(vehicule).subscribe({
      next: (data: Blob | string) => {
        if (typeof data === 'string') {
          snackBarRef.dismiss();
          this.snackBar.open(data.toString(), 'Fermer', { duration: 3000 });
        } else {
          snackBarRef.dismiss();
          const fileURL = URL.createObjectURL(data);
          const windowRef = window.open(fileURL, '_blank');
          if (windowRef) {
            windowRef.focus();
          }
        }
      },
      error: (err) => {
        snackBarRef.dismiss();
        this.snackBar.open('Erreur lors de l\'impression du carburant.', 'Fermer', { duration: 3000 });
      }
    });
  }


}
