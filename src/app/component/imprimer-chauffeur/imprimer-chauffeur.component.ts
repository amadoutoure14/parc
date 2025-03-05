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
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './imprimer-chauffeur.component.html',
  styleUrl: './imprimer-chauffeur.component.css'
})
export class ImprimerChauffeurComponent {

  constructor(private service:ChauffeurService,private datePipe: DatePipe,private snackBar: MatSnackBar ) {

  }

  chauffeurs: Chauffeur[] = [];
  debut!: Date;
  fin!: Date;


  rechercher(debut: Date,fin: Date) {
    if (!debut && !fin) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    this.service.filtreChauffeurDate(debut,fin).subscribe({
      next: (data) => {
        this.chauffeurs = data.chauffeur;
      },
      error: (err) => {
        this.snackBar.open(err.error, 'Fermer', {
          duration: 6000,
          panelClass: ['snackbar-error'],
        });
      }
    });
  }


  imprimer(debut: Date, fin: Date) {
    if (!debut || !fin) {
      this.snackBar.open('Veuillez sélectionner une date.', 'Fermer', { duration: 3000 });
    }
    this.service.imprimerChauffeurDate(debut, fin).subscribe({
      next: (response) => {
        const url = URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
        Object.assign(document.createElement('a'), { href: url, download: 'La_liste_des_chauffeurs.pdf' }).click();
        URL.revokeObjectURL(url);
        this.snackBar.open('Le PDF est en téléchargement.', 'Fermer', { duration: 3000 });
      },
      error: ({ error }) => this.snackBar.open('Erreur lors de la génération du PDF: ' + error, 'Fermer', { duration: 5000 })
    });
  }



  modifier(chauffeur: Chauffeur) {

  }

}
