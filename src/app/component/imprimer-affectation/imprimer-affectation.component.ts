import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Affectation} from '../../modeles/Affectation';
import {AffectationService} from '../../services/affectation.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-imprimer-affectation',
  providers:[DatePipe],
  imports: [
    FormsModule,
    MatButton,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './imprimer-affectation.component.html',
  styleUrl: './imprimer-affectation.component.css'
})
export class ImprimerAffectationComponent {

  constructor(private service: AffectationService,private snackBar: MatSnackBar,private datePipe: DatePipe) {
  }

  date='';
  affectations: Affectation[]=[];

  rechercher(date: string) {
    if (!date) {
      alert("Sélectionner une date !")
    }else {
      const formatted = this.datePipe.transform(date, 'dd/MM/yyyy');
      this.service.dateAffectation(formatted).subscribe({
        next: value => {
          if (value.length ===0) {
            this.snackBar.open(`Aucun enregistrement n'a été effectué le ${formatted}`);
          }else {
            this.affectations = value;
            this.snackBar.open('La liste des affectations au ' + formatted, 'Fermer');
          }
        },
        error: error => {
          this.snackBar.open("Une erreur est survenue de type " + error.message, 'Fermer')
        }})
    }
  }

  imprimer(date: string) {
    if (!date) {
      alert('Sélectionner une date!');
    } else {
      const formatted = this.datePipe.transform(date, 'dd/MM/yyyy');
      this.service.imprimerAffectation(formatted).subscribe({
        next: (response: Blob) => {
          // Créer un objet URL pour le Blob
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);

          // Créer un lien pour télécharger le PDF
          const a = document.createElement('a');
          a.href = url;
          a.download = `Liste_des_Affectations_du_${date}.pdf`; // Nom du fichier PDF
          a.click(); // Lancer le téléchargement
          window.URL.revokeObjectURL(url); // Révoquer l'URL
          this.snackBar.open('Le PDF est en téléchargement.', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          alert('Erreur lors de la génération du PDF');
          console.error(error); // Pour voir l'erreur dans la console
        }
      });
    }
  }

  delete(id: number | undefined) {
  }

  edit(id: number | undefined) {

  }
}
