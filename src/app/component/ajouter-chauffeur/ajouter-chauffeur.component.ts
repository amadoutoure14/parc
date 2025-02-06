import {Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import {NgIf} from '@angular/common';
import {ChauffeurService} from '../../services/chauffeur.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajouter-chauffeur',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './ajouter-chauffeur.component.html',
  styleUrl: './ajouter-chauffeur.component.css'
})
export class AjouterChauffeurComponent {
  chauffeur = {
    nom_complet: '',
    permis: '',
    telephone: ''
  };

  constructor(private chauffeurService: ChauffeurService, private snackBar: MatSnackBar) {}

  onSubmit() {
    if (!this.chauffeur.nom_complet || !this.chauffeur.permis || !this.chauffeur.telephone) {
      return;
    }

    this.chauffeurService.ajouterChauffeur(this.chauffeur).subscribe({
      next: (response) => {
        this.snackBar.open('Chauffeur ajouté avec succès !', 'Fermer', { duration: 3000, panelClass: ['success-snackbar'] });
      },
      error: (err) => {
        this.snackBar.open('Erreur lors de l\'ajout du chauffeur.', 'Fermer', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }
}
