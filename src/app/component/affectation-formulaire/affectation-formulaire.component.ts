import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {MatListOption} from '@angular/material/list';


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
    MatOption,
    MatOption,
    MatOption,
    MatOption
  ],
  templateUrl: './affectation-formulaire.component.html',
  styleUrl: './affectation-formulaire.component.css'
})
export class AffectationFormulaireComponent implements OnInit {
  affectationForm!: FormGroup;
  chauffeurs: Chauffeur[] = [];
  vehicules: Vehicule[] = [];
  minDate = new Date(2018, 0, 1).toISOString().split('T')[0];
  maxDate = new Date().toISOString().split('T')[0];

  constructor(
    private service: AffectationService,
    private chauffeurService: ChauffeurService,
    private vehiculeService: VehiculeService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.affectationForm = this.fb.group({
      chauffeur: [null, Validators.required],
      vehicule: [null, Validators.required],
      date: [
        null,
        [
          Validators.required,
          this.dateValidator.bind(this)
        ]
      ]
    });

    this.vehiculeService.listeVehicule().subscribe({
      next: (data) => {
        this.vehicules = data.vehicule;
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement des véhicules', 'Fermer', { duration: 3000 });
      }
    });

    this.chauffeurService.listeChauffeur().subscribe({
      next: (data) => {
        this.chauffeurs = data.chauffeur;
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement des chauffeurs', 'Fermer', { duration: 3000 });
      }
    });
  }

  // Fonction de comparaison pour les objets chauffeur et véhicule
  compareChauffeur(c1: Chauffeur, c2: Chauffeur): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareVehicule(v1: Vehicule, v2: Vehicule): boolean {
    return v1 && v2 ? v1.id === v2.id : v1 === v2;
  }

  dateValidator(control: any) {
    const selectedDate = control.value;
    if (selectedDate) {
      if (selectedDate < this.minDate) {
        return { min: true };
      }
      if (selectedDate > this.maxDate) {
        return { max: true };
      }
    }
    return null;
  }

  affecter() {
    if (this.affectationForm.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs correctement.', 'Fermer', { duration: 3000 });
      return;
    }

    const affectation: Affectation = this.affectationForm.value;

    this.service.nouvelleAffectation(affectation).subscribe({
      next: (data) => {
        this.affectationForm.reset();
        this.snackBar.open(`${data.message}`, 'Fermer', { duration: 6000 });
      },
      error: (error) => {
        const message = error.error?.message || 'Une erreur est survenue.';
        this.snackBar.open(message, 'Fermer', { duration: 3000 });
      }
    });
  }
}

