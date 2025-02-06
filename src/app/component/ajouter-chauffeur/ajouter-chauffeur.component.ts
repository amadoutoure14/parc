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
  // Définir l'objet chauffeur
  chauffeur = {
    nom_complet: '',
    permis: '',
    telephone: ''
  };

  constructor(private chauffeurService: ChauffeurService, private snackBar: MatSnackBar) {}

  // Fonction appelée lors de la soumission du formulaire
  onSubmit() {
    // Vérification si tous les champs sont remplis
    if (!this.chauffeur.nom_complet || !this.chauffeur.permis || !this.chauffeur.telephone) {
      return;
    }
     const newChauffeur = new Chauffeur(
      '',
      this.chauffeur.nom_complet,
      this.chauffeur.permis,
      this.chauffeur.telephone,
    );
    // Appel du service pour ajouter le chauffeur
    this.chauffeurService.ajouterChauffeur(newChauffeur).subscribe({
      next: () => {
        // Message de succès
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
