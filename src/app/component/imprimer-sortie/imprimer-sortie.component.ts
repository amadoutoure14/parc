import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {MatInput} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-imprimer-sortie',
    imports: [
        MatButton,
        MatIcon,
        ReactiveFormsModule,
        FormsModule,
        NgForOf,
        NgIf,
        MatInput,
        DatePipe
    ],
  providers: [DatePipe],
  templateUrl: './imprimer-sortie.component.html',
  styleUrl: './imprimer-sortie.component.css'
})
export class ImprimerSortieComponent {

  constructor(private datePipe:DatePipe,private service:SortieService,private snackBar:MatSnackBar ) {
  }

  debut!:Date;
  sorties:Sortie[]=[]
  filtreSorties:Sortie[]=[]
  filterTerm='';
  fin!: Date;

  rechercherSortieDates(debut:Date, fin:Date) {
    this.service.sortieDates(debut,fin).subscribe({
      next: (value) => {
        this.sorties=value.sortie
        this.filtreSorties = [...this.sorties]
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  imprimerSortieDate(debut:Date, fin:Date) {
    this.service.sortieDatesPdf(debut,fin).subscribe({
        next:response => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `La_liste_des_sorties_enregistrés_entre_${debut}_et_le_${fin}.pdf`;
          a.click();

          window.URL.revokeObjectURL(url);

          this.snackBar.open('Le PDF est en téléchargement.', 'Fermer', { duration: 3000 });

        },
      error: (error) => {
        console.log(error);
      }
    })
  }




  filterSortie() {
    if (this.filterTerm.trim()) {
       this.filtreSorties = this.sorties.filter(sortie => {
         return (
           sortie.destination?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
           sortie.lieu_depart?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
           sortie.objet?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
           sortie.affectation?.chauffeur?.nom_complet?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
           sortie.affectation?.chauffeur?.telephone?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
           sortie.affectation?.vehicule?.immatriculation?.toLowerCase().includes(this.filterTerm.toLowerCase()))
       });
    } else {
      this.filtreSorties = [...this.sorties];
    }
  }

}

