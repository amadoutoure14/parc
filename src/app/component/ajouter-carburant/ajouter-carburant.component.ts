import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CarburantService} from '../../services/carburant.service';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {Carburant} from '../../modeles/Carburant';

@Component({
  selector: 'app-ajouter-carburant',
  imports: [
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    NgForOf,
    FormsModule
  ],
  providers: [DatePipe],
  templateUrl: './ajouter-carburant.component.html',
  styleUrl: './ajouter-carburant.component.css'
})
export class AjouterCarburantComponent implements OnInit {
  vehicules: Vehicule[] = [];
  vehicule: Vehicule | null = null;
  carburant: Carburant;

  constructor(private snackBar: MatSnackBar, private service: CarburantService, private vehiculeService: VehiculeService) {
    this.carburant = new Carburant(0, null, null, this.vehicule);
  }

  ngOnInit(): void {

    this.vehiculeService.listeVehicule().subscribe({
      next: (data) => {
        this.vehicules = data.vehicule;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    if (this.vehicule && this.carburant.approv > 0) {

      this.carburant.vehicule = this.vehicule;


      this.service.approvisionner(this.carburant).subscribe({
        next: (data) => {
          this.snackBar.open('Véhicule approvisionné !', 'Fermer', { duration: 3000 });
          this.carburant.approv=0
        },
        error: (err) => {
          this.snackBar.open("Une erreur est survenue !","Fermer",{duration:3000})
        }
      });
    }
  }
}

