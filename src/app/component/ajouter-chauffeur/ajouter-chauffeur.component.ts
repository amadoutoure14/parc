import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ChauffeurService } from '../../services/chauffeur.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Chauffeur} from '../../modeles/Chauffeur';

@Component({
  selector: 'app-ajouter-chauffeur',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './ajouter-chauffeur.component.html',
  styleUrls: ['./ajouter-chauffeur.component.css']
})
export class AjouterChauffeurComponent {
  chauffeurForm: FormGroup;

  constructor(private fb: FormBuilder, private chauffeurService: ChauffeurService, private snackBar: MatSnackBar) {
    this.chauffeurForm = this.fb.group({
      nom_complet: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });
  }

  onSubmit() {
    if (this.chauffeurForm.invalid) {
      return;
    }

    this.chauffeurService.ajouterChauffeur(this.chauffeurForm.value).subscribe({
      next: () => {
        this.snackBar.open('Chauffeur ajouté avec succès !', 'Fermer', { duration: 6000, panelClass: ['success-snackbar'] });
        this.chauffeurForm.reset();
      },
      error: () => {
        this.snackBar.open("Erreur lors de l'ajout du chauffeur.", 'Fermer', { duration: 6000, panelClass: ['error-snackbar'] });
      }
    });
  }
}
