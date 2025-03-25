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
        DatePipe,
    ],
  templateUrl: './index-chauffeur.component.html',
  styleUrl: './index-chauffeur.component.css'
})
export class IndexChauffeurComponent {

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

}
