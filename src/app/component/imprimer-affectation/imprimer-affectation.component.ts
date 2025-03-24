import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Affectation} from '../../modeles/Affectation';
import {AffectationService} from '../../services/affectation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Carburant} from '../../modeles/Carburant';

@Component({
  selector: 'app-imprimer-affectation',
  providers:[DatePipe],
    imports: [
        FormsModule,
        MatButton,
        MatIcon,
        NgForOf,
        NgIf
    ],
  templateUrl: './imprimer-affectation.component.html',
  styleUrl: './imprimer-affectation.component.css'
})

export class ImprimerAffectationComponent {

  affectations: Affectation[] = [];
  debut!: Date;
  fin!: Date;

  constructor(
    private service: AffectationService,
    private snackBar: MatSnackBar
  ) {}

  rechercher(debut: Date, fin: Date) {

    this.service.dateAffectation(debut, fin).subscribe({
      next: value => {
        if (value.length === 0) {
          this.snackBar.open('Aucune affectation trouvée pour cette période.', 'Fermer', { duration: 3000 });
        } else {
          this.affectations = value.affectation;
        }
      },
      error: error => {
        this.snackBar.open("Une erreur est survenue de type " + error.message, 'Fermer', { duration: 3000 });
      }
    });
  }

  imprimer(debut: Date, fin: Date){

  }

  totalCarburant(carburants: Carburant[] | null | undefined): number {
    return (carburants ?? []).reduce((total, carburant) => total + carburant.approv, 0);
  }
}
