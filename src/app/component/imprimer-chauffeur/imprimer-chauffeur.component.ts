import { Component } from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {ChauffeurService} from '../../services/chauffeur.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {Chauffeur} from '../../modeles/Chauffeur';

@Component({
  selector: 'app-imprimer-chauffeur',
  standalone: true,
  providers: [DatePipe],
  imports: [
    MatButton,
    HttpClientModule,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgForOf,
    MatIconButton
  ],
  templateUrl: './imprimer-chauffeur.component.html',
  styleUrl: './imprimer-chauffeur.component.css'
})
export class ImprimerChauffeurComponent {

  constructor(private service:ChauffeurService,private datePipe: DatePipe,private snackBar: MatSnackBar ) {}

  date='';
  chauffeurs: Chauffeur[] = [];


  rechercher(date: string) {
    if (!date) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    const formatted = this.datePipe.transform(date, 'dd/MM/yyyy');

    if (formatted) {
      this.service.filtreChauffeurDate(formatted).subscribe({
        next: (data) => {
          if (data.length === 0) {
            this.chauffeurs = [];
            this.snackBar.open('Aucun chauffeur trouvé pour cette date.', '', { duration: 3000 });
          } else {
            this.chauffeurs = data;
            this.snackBar.open(`La liste des présences de chauffeur au ${formatted}`,'Fermer',  { duration: 3000 });
          }
        },
        error: (err) => {
          this.snackBar.open(err.error, 'Fermer', {
            duration: 6000,
            panelClass: ['snackbar-error'],
          });
        }
      });
    }
  }

  imprimer(date: string): void {
    if (!date) {
      this.snackBar.open('Veuillez sélectionner une date.', 'Fermer', { duration: 3000 });
      return;
    }
    const formatted = this.datePipe.transform(date, 'dd/MM/yyyy');

    this.service.imprimerChauffeurDate(formatted).subscribe({
      next: (response) => {
        // Crée un URL temporaire pour le blob (le PDF)
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Crée un lien temporaire pour télécharger le fichier
        const a = document.createElement('a');
        a.href = url;
        a.download = `La_liste_des_chauffeurs_du_${date}.pdf`; // Nom du fichier
        a.click();

        // Libère l'URL une fois que le téléchargement est terminé
        window.URL.revokeObjectURL(url);

        this.snackBar.open('Le PDF est en téléchargement.', 'Fermer', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open('Erreur lors de la génération du PDF: ' + err.error, 'Fermer', { duration: 5000 });
      }
    });
  }


  edit(id: number | undefined) {

  }

  delete(id: number | undefined) {

  }
}
