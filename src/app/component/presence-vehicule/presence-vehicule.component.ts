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
  vehicules: Vehicule[] = [
    new Vehicule([], 'Véhicule en bon état', '2024-02-05', true, 1, 'AA-123-BB', 'Toyota Corolla'),
    new Vehicule([], 'Besoin de maintenance', '2024-01-20', false, 2, 'CC-456-DD', 'Peugeot 308'),
    new Vehicule([], 'Récent et performant', '2023-12-15', true, 3, 'EE-789-FF', 'Honda Civic')
  ];

  editVehicule(vehicule: Vehicule) {
    console.log('Édition du véhicule:', vehicule);
  }

  deleteVehicule(vehicule: Vehicule) {
    this.vehicules = this.vehicules.filter(v => v.id !== vehicule.id);
    console.log('Véhicule supprimé:', vehicule);
  }
}
