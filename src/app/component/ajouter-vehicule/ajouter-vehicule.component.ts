import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-ajouter-vehicule',
  templateUrl: './ajouter-vehicule.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./ajouter-vehicule.component.css']
})
export class AjouterVehiculeComponent {
  vehicule: Vehicule = new Vehicule();

  constructor(private service: VehiculeService, private snackBar: MatSnackBar) {}

  onSubmit() {
    this.service.enregistrerVehicule(this.vehicule.toJson()).subscribe({
      next: () => {
        this.snackBar.open('Véhicule enregistré avec succès', 'Fermer', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open("erreur", 'Fermer', { duration: 3000 });
      }
    });
  }

}
