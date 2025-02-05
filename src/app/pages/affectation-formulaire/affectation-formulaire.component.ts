import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';


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
  ],
  templateUrl: './affectation-formulaire.component.html',
  styleUrl: './affectation-formulaire.component.css'
})
export class AffectationFormulaireComponent implements OnInit{
  chauffeurs = [
    { id: 1, nom_complet: 'Jean Dupont', permis: 'B', telephone: '0102030405', date: '2023-01-15' },
    { id: 2, nom_complet: 'Marie Curie', permis: 'C', telephone: '0607080910', date: '2022-03-22' }
  ];
  vehicules = [
    { id: 1, nom: 'Véhicule 1', type: 'Camion', immatriculation: 'AB-123-CD' },
    { id: 2, nom: 'Véhicule 2', type: 'Voiture', immatriculation: 'XY-456-ZZ' }
  ];

  selectedChauffeur: any;
  selectedVehicule: any;

  ngOnInit(): void {
    // Initialiser avec le premier chauffeur
    this.selectedChauffeur = this.chauffeurs[0];
  }

  onChauffeurChange(): void {
    console.log('Chauffeur sélectionné:', this.selectedChauffeur);
  }

  onVehiculeChange(): void {
    console.log('Véhicule sélectionné:', this.selectedVehicule);
  }

  affecterChauffeur(): void {
    console.log('Chauffeur affecté:', this.selectedChauffeur);
  }

  modifierChauffeur(): void {
    // Logique pour modifier le chauffeur
    console.log('Modification du chauffeur:', this.selectedChauffeur);
  }

  supprimerChauffeur(): void {
    // Logique pour supprimer le chauffeur
    console.log('Suppression du chauffeur:', this.selectedChauffeur);
    // Suppression du chauffeur de la liste, par exemple
    this.chauffeurs = this.chauffeurs.filter(chauffeur => chauffeur !== this.selectedChauffeur);
    this.selectedChauffeur = this.chauffeurs[0]; // Optionnel : sélectionner le premier chauffeur restant
  }
}
