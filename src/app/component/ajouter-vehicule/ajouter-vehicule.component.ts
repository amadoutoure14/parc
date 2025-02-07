import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgIf} from "@angular/common";
import {Vehicule} from '../../modeles/Vehicule';

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
   vehicule={
     immatriculation:'',
     modele:'',
     commentaire:''
   } ;

  onSubmit() {

  }
}
