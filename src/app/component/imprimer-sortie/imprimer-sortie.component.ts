import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {MatInput} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Carburant} from '../../modeles/Carburant';

@Component({
  selector: 'app-imprimer-sortie',
    imports: [
        MatButton,
        MatIcon,
        ReactiveFormsModule,
        FormsModule,
        MatIconButton,
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

  date= '';
  sorties:Sortie[]=[]
  filtreSorties:Sortie[]=[]
  filterTerm='';

  rechercherSortieDate(date: string) {
    const formatted = this.datePipe.transform(date,'dd/MM/yyyy');
    this.service.sortieDate(formatted).subscribe({
      next: (value) => {
        this.sorties=value
        this.filtreSorties = value
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  imprimerSortieDate(date: string) {
    const formatted = this.datePipe.transform(date,'dd/MM/yyyy');
    this.service.sortieDatePdf(formatted).subscribe({
        next:response => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `La_liste_des_sorties_du_${date}.pdf`;
          a.click();

          window.URL.revokeObjectURL(url);

          this.snackBar.open('Le PDF est en téléchargement.', 'Fermer', { duration: 3000 });

        },
      error: (error) => {
        console.log(error);
      }
    })
  }

  edit() {

  }

  delete() {

  }

  filterSortie() {
    if (this.filterTerm.trim()) {
      // this.filtreSorties = this.sorties.filter(sortie => {
      //   return (
      //     sortie.destination?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
      //     sortie.objet?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
      //     sortie.affectation?.chauffeur?.nom_complet?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
      //     sortie.affectation?.chauffeur?.telephone?.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
      //     sortie.affectation?.vehicule?.immatriculation?.toLowerCase().includes(this.filterTerm.toLowerCase()))
      // });
    } else {
      this.filtreSorties = [...this.sorties];
    }
  }
  totalCarburant(carburants: Carburant[] | null | undefined):number{
    return (carburants?? []).reduce((total, carburant) =>total+carburant.approv,0 );
  }
}
/*
      <td>{{ sortie.affectation?.chauffeur?.nom_complet }}</td>
      <td>{{ sortie.affectation?.chauffeur?.telephone }}</td>
      <td>{{ sortie.affectation?.vehicule?.immatriculation }}</td>
      <td>{{ totalCarburant(sortie.affectation?.vehicule?.carburants) }}</td>
* */
