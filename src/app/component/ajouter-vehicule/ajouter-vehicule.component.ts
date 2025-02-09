import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgIf} from "@angular/common";
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajouter-vehicule',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgIf
    ],
  templateUrl: './ajouter-vehicule.component.html',
  styleUrl: './ajouter-vehicule.component.css'
})
export class AjouterVehiculeComponent {


  constructor(private service: VehiculeService,private snackBar: MatSnackBar) {
  }

  vehicule={
     immatriculation:'',
     modele:'',
     commentaire:''
   } ;

  onSubmit() {
    const vehicule = new Vehicule([], this.vehicule.commentaire, '', true, 0, this.vehicule.immatriculation, this.vehicule.modele);
    this.service.enregistrerVehicule(vehicule).subscribe({
      next: () => {
        this.snackBar.open('Véhicule enregistré !', 'OK');
        this.vehicule.modele='',this.vehicule.commentaire='',this.vehicule.immatriculation='';
      },
      error: () => {
        this.snackBar.open('Une erreur est survenue lors de l\'enregristement !', 'FERMER');
      }
    })
  }


}
