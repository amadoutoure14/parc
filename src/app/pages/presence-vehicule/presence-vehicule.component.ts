import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {Vehicule} from '../../modeles/Vehicule';

@Component({
  selector: 'app-presence-vehicule',
  imports: [
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './presence-vehicule.component.html',
  styleUrl: './presence-vehicule.component.css'
})
export class PresenceVehiculeComponent {
vehicules: Vehicule[] = [];

  editVehicule(vehicule: Vehicule) {

  }

  deleteVehicule(vehicule: Vehicule) {

  }
}
