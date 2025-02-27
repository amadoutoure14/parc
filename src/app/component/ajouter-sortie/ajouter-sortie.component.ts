import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Affectation } from '../../modeles/Affectation';
import {DatePipe, NgForOf} from '@angular/common';
import { AffectationService } from '../../services/affectation.service';
import { SortieService } from '../../services/sortie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sortie } from '../../modeles/Sortie';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-ajouter-sortie',
  providers: [DatePipe],
  templateUrl: './ajouter-sortie.component.html',
  imports: [
    MatOption,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    NgForOf,
    MatButton,
    MatLabel
  ],
  styleUrl: './ajouter-sortie.component.css'
})
export class AjouterSortieComponent implements OnInit {
  affectations: Affectation[] = [];
  sortieForm!: FormGroup;

  constructor(
    private affectationService: AffectationService,
    private sortieService: SortieService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.sortieForm = this.fb.group({
      affectation: [null, Validators.required],
      objet: ['', Validators.required],
      destination: ['', Validators.required],
      depart: ['', Validators.required],
      arrivee: ['', Validators.required],
    });

    // Chargement des affectations
    this.affectationService.listeAffectations().subscribe({
      next: (data) => {
        this.affectations = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des affectations", err);
      }
    });
  }

  onSubmit(): void {
    if (this.sortieForm.invalid) {
      this.snackbar.open("Veuillez remplir tous les champs obligatoires", "Fermer", { duration: 3000 });
      return;
    }
    const formValue = this.sortieForm.value;
    const sortie: Sortie = new Sortie(
      null,
      formValue.affectation,
      formValue.objet,
      formValue.destination,
      formValue.arrivee,
      formValue.depart,
      null,
      null
    );

    this.sortieService.enregistrer(sortie).subscribe({
      next: () => {
        this.snackbar.open("Sortie enregistrée avec succès !", "Fermer", { duration: 3000 });
        this.sortieForm.reset();
      },
      error: (error) => {
        console.error(error);
        this.snackbar.open("Une erreur est survenue !", "Fermer", { duration: 3000 });
        this.sortieForm.reset();
      }
    });

  }
}
