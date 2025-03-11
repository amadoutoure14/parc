import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Vehicule} from '../../modeles/Vehicule';
import {Chauffeur} from '../../modeles/Chauffeur';
import {AffectationService} from '../../services/affectation.service';
import {ChauffeurService} from '../../services/chauffeur.service';
import {VehiculeService} from '../../services/vehicule.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Affectation} from '../../modeles/Affectation';


@Component({
  selector: 'app-affectation-formulaire',
  imports: [
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    NgIf,
    MatCardModule,
    MatFormField,
    NgForOf,
    FormsModule,
    MatLabel,
    DatePipe,
  ],
  templateUrl: './affectation-formulaire.component.html',
  styleUrl: './affectation-formulaire.component.css'
})
export class AffectationFormulaireComponent implements OnInit {

  // @ts-ignore
  affectation: Affectation = new Affectation();
  chauffeurs: Chauffeur[] = [];
  vehicules: Vehicule[] = [];
  selectedChauffeur!: Chauffeur;
  selectedVehicule!: Vehicule;
  nom: string = '';

  constructor(private service: AffectationService, private chauffeurService: ChauffeurService, private vehiculeService: VehiculeService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.vehiculeService.listeVehicule().subscribe({
      next: (data) => {
        this.vehicules = data.vehicule || data;
        if (this.vehicules.length > 0) {
          this.selectedVehicule = this.vehicules[0];
        }
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement des véhicules', 'Fermer', { duration: 3000 });
      }
    });

    this.chauffeurService.listeChauffeur().subscribe({
      next: (data) => {
        this.chauffeurs = data.chauffeur || data;
        if (this.chauffeurs.length > 0) {
          this.selectedChauffeur = this.chauffeurs[0];
        }
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement des chauffeurs', 'Fermer', { duration: 3000 });
      }
    });
  }

  affecterChauffeur() {
    if (!this.nom.trim()) {
      this.snackBar.open('Veuillez entrer un nom pour l’affectation.', 'Fermer', { duration: 3000 });
      return;
    }

    this.affectation.chauffeur = this.selectedChauffeur;
    this.affectation.vehicule = this.selectedVehicule;
    this.affectation.nom_affectation=this.nom

    this.service.nouvelleAffectation(this.affectation).subscribe({
      next: (data) => {
        this.snackBar.open(`${data.message}`, 'Fermer', { duration: 6000 });
      },
      error: (error) => {
        console.error(error);
        const message = error.error?.message || 'Une erreur est survenue.';
        this.snackBar.open(message, 'Fermer', { duration: 3000 });
      }
    });
  }
}

