import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
     const newChauffeur = new Chauffeur(
      '',
      this.chauffeur.nom_complet,
      this.chauffeur.permis,
      this.chauffeur.telephone,
    );

    this.chauffeurService.ajouterChauffeur(newChauffeur).subscribe({
      next: () => {
        this.snackBar.open('Chauffeur ajouté avec succès !', 'Fermer', { duration: 6000, panelClass: ['success-snackbar'] });
        this.chauffeur.nom_complet = '';
        this.chauffeur.permis = '';
        this.chauffeur.telephone = '';
      },
      error: () => {
        this.snackBar.open('Erreur lors de l\'ajout du chauffeur.', 'Fermer', { duration: 6000, panelClass: ['error-snackbar'] });
      }
    });
  }
}
