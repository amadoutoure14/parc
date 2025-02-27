import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApprovisionnementService} from '../../services/approvisionnement.service';
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
  templateUrl: './ajouter-approvisionnement.component.html',
  styleUrl: './ajouter-approvisionnement.component.css'
})
export class AjouterApprovisionnementComponent implements OnInit {
  vehicules: Vehicule[] = [];
  selectedVehicule: Vehicule | null = null;
  carburant: Carburant;

  constructor(
    private snackBar: MatSnackBar,
    private service: ApprovisionnementService,
    private vehiculeService: VehiculeService
  ) {
    this.carburant = new Carburant(0, null, null, this.selectedVehicule);
  }

  ngOnInit(): void {
    // Récupération de la liste des véhicules
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
    if (this.selectedVehicule && this.carburant.approv > 0) {
      // Utiliser l'objet Vehicule directement au lieu de chercher par ID
      this.carburant.vehicule = this.selectedVehicule;

      this.service.approvisionner(this.carburant).subscribe({
        next: (data) => {
          this.snackBar.open(`${this.selectedVehicule?.immatriculation} approvisionnée`, 'OK', { duration: 3000 });
          this.carburant.approv=0
        },
        error: (err) => {
          this.snackBar.open(`${this.selectedVehicule?.immatriculation} approvisionnée`, 'OK', { duration: 3000 });
          this.carburant.approv=0
        }
      });

      console.log('Véhicule:', this.selectedVehicule, 'Carburant:', this.carburant.approv);
    }
  }
}

