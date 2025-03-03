import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
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
  ],
  templateUrl: './affectation-formulaire.component.html',
  styleUrl: './affectation-formulaire.component.css'
})
export class AffectationFormulaireComponent implements OnInit{

  constructor(private  service:AffectationService,private chauffeurService:ChauffeurService,private vehiculeService:VehiculeService,private snackBar:MatSnackBar) {
  }

  chauffeurs:Chauffeur[] = [];
  vehicules:Vehicule[] = [];

  selectedChauffeur!: Chauffeur;
  selectedVehicule!: Vehicule;
  nom:string='';

  ngOnInit(): void {
    this.vehiculeService.listeVehicule().subscribe(
      {next:value => {
          this.vehicules = value.vehicule;
          this.selectedVehicule = this.vehicules[0];
          console.log(this.selectedVehicule.date)
        },
        error: error => {
          console.log(error);
        }})
    this.chauffeurService.listeChauffeur().subscribe({
      next:value => {
        this.chauffeurs = value;
        this.selectedChauffeur = this.chauffeurs[0];
      },
      error: error => {
        console.log(error);
      }})

  }


  affecterChauffeur() {
    if (!this.nom || this.nom.trim() === '') {
      this.snackBar.open('Veuillez entrer un nom pour l’affectation.', 'Fermer', { duration: 3000 });
      return;
    }


    this.service.nouvelleAffectation().subscribe({
      next: value => {
        this.snackBar.open(`Affectation effectuée avec succès`, 'Fermer', { duration: 6000 });
      },
      error: error => {
        console.log(error);
        this.snackBar.open('Une erreur est survenue : ' + error, 'Fermer', { duration: 3000 });
      }
    });
  }

}
