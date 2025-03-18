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
  templateUrl: './pointage-vehicule-formulaire.component.html',
  styleUrl: './pointage-vehicule-formulaire.component.css'
})
export class PointageVehiculeFormulaireComponent implements OnInit {
  vehicules: Vehicule[] = [];
  date!: Date|null;

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
      this.service.pointer(this.date, vehicule.id).subscribe({
        next: (data: any) => {
          vehicule.cocher = false;
          this.date = null;
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
      this.date = null;
    }
  }

}


