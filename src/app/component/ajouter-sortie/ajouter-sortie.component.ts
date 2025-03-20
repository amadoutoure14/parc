import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Affectation } from '../../modeles/Affectation';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { AffectationService } from '../../services/affectation.service';
import { SortieService } from '../../services/sortie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sortie } from '../../modeles/Sortie';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';

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
    MatLabel,
    NgIf,
    DatePipe
  ],
  styleUrl: './ajouter-sortie.component.css'
})
export class AjouterSortieComponent implements OnInit {
  affectations: Affectation[] = [];
  sortieForm!: FormGroup;
  id!: number;
  derniereSortie: Sortie | null = null;

  constructor(private affectationService: AffectationService, private service: SortieService, private snackbar: MatSnackBar, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sortieForm = this.fb.group({
      affectation: [null, Validators.required],
      objet: ['', Validators.required],
      destination: ['', Validators.required],
      lieu_depart: ['', Validators.required]
    });

    this.affectationService.listeAffectations().subscribe({
      next: (data) => {
        this.affectations = data.affectation;

        if (this.affectations && this.affectations.length > 0) {
          this.affectations.forEach((affectation) => {
            if (affectation.id !== null && affectation.id !== undefined) {
              this.service.derniereSortie(affectation.id).subscribe({
                next: (data) => {
                  if (data && data.sortie) {
                    this.derniereSortie = data.sortie;
                  } else {
                    this.derniereSortie = null;
                  }
                },
                error: (err) => {
                  console.error(err);
                  this.derniereSortie = null;
                }
              });
            }
          });
        } else {
          this.derniereSortie = null;
        }
      },
      error: (err) => {
        console.error(err);
        this.showSnackbar("Erreur lors du chargement des affectations.");
      }
    });
  }


  onSubmit() {
    if (this.sortieForm.invalid) {
      this.showSnackbar('Veuillez remplir tous les champs requis.');
      return;
    }

    const sortie: Sortie = this.sortieForm.value;

    this.service.enregistrer(sortie).subscribe({
      next: (response) => {
        this.showSnackbar(response.message || 'Sortie enregistrée avec succès.');
        this.sortieForm.reset();
      },
      error: (err) => {
        console.error();
        const message = err.error?.message || "Erreur lors de l'enregistrement.";
        this.showSnackbar(message);
      }
    });
  }

  private showSnackbar(message: string) {
    this.snackbar.open(message, 'Fermer', { duration: 5000 });
  }
}

