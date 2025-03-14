import {Component, OnInit} from '@angular/core';
import {VehiculeService} from '../../services/vehicule.service';
import {Vehicule} from '../../modeles/Vehicule';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PointageService} from '../../services/pointage.service';


@Component({
  selector: 'app-pointage-formulaire',
  imports: [
    FormsModule,
    MatButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './pointage-formulaire.component.html',
  styleUrl: './pointage-formulaire.component.css'
})
export class PointageFormulaireComponent implements OnInit {
  vehicules: Vehicule[] = [];

  constructor(
    private VehiculeService: VehiculeService,
    private snackBar: MatSnackBar,
    private service: PointageService
  ) {}

  ngOnInit(): void {
    this.VehiculeService.listeVehicule().subscribe({
      next: (data: any) => {
        this.vehicules = data.vehicule;
        this.snackBar.open(data.message, "Fermer", { duration: 3000 });
      }
    });
  }

  submit(vehicule: Vehicule) {
    if (vehicule.cocher) {
      this.service.pointer(vehicule.datePointage, vehicule.id).subscribe({
        next: (data: any) => {
          vehicule.cocher = false;
          vehicule.datePointage = null;
          this.snackBar.open(data.message, "Fermer", { duration: 3000 });
        },
        error: (err) => {
          const errorMessage = err.error?.message || "Une erreur est survenue";
          this.snackBar.open(errorMessage, "Fermer", { duration: 3000 });
        }
      });
    }
  }


  resetDate(vehicule: Vehicule) {
    if (!vehicule.cocher) {
      vehicule.datePointage = null;
    }
  }

}


