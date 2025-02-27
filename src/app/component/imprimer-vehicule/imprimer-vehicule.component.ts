import { Component } from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Vehicule} from '../../modeles/Vehicule';
import {MatIcon} from '@angular/material/icon';
import {VehiculeService} from '../../services/vehicule.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Carburant} from '../../modeles/Carburant';
import {MatInput} from '@angular/material/input';


@Component({
  selector: 'app-imprimer-vehicule',
  templateUrl: './imprimer-vehicule.component.html',
  providers:[DatePipe],
  imports: [
    FormsModule,
    MatButton,
    MatIcon,
    NgForOf,
    NgIf,
    MatInput,
    NgClass
  ],
  styleUrls: ['./imprimer-vehicule.component.css']
})
export class ImprimerVehiculeComponent {

  debut: string = '';
  fin: string = '';
  vehicules: Vehicule[] = [];
  filtrevehicules: Vehicule[] = [];
  filterTerm = '';

  constructor(private service: VehiculeService,private datePipe:DatePipe, private snackBar:MatSnackBar) { }


  rechercherVehiculeDateEnregistrement(debut: string, fin: string) {
    if (!debut && !fin) {
      alert('Veuillez sélectionner une intervalle !');
      return;
    }

    this.service.vehiculeDatesEnregistrement(debut,fin).subscribe({
      next: (data) => {
        if (data.vehicule.length === 0) {
          this.vehicules=[]
        }else {
          this.vehicules = data.vehicule;
          this.filtrevehicules = this.vehicules;
          this.snackBar.open(data.message,'Fermer',  { duration: 3000 });
        }
      }
    })
  }

  imprimerVehiculeDateEnregistrement(debut: string,fin: string,) {
    const debutFormat = this.datePipe.transform(debut,"dd/MM/yyyy");
    const finFormat = this.datePipe.transform(fin,"dd/MM/yyyy");
    if (!debut && !fin) {
      alert('Veuillez sélectionner une intervalle !.');
      return;
    }
      this.service.imprimerVehiculeDateEnregistrement(debut,fin).subscribe({
        next:response => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `La liste des véhicules enregistrent entre le ${debutFormat} et le ${finFormat} .pdf`;
          a.click();

          window.URL.revokeObjectURL(url);

          this.snackBar.open('Le PDF est en téléchargement.', 'Fermer', { duration: 3000 });

        },
        error:err => this.snackBar.open('Erreur de chargement'+err,'Fermer',{duration:3000})
      })
    }



  edit() {

  }
  filterVehicules() {
    if (this.filterTerm) {
      this.filtrevehicules = this.vehicules.filter(
        vehicule =>
          vehicule.modele.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
          vehicule.immatriculation.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
          (vehicule.commentaire && vehicule.commentaire.toLowerCase().includes(this.filterTerm.toLowerCase()))
      );
    } else {
      this.filtrevehicules = [...this.vehicules];
    }
  }

  getTotalCarburant(carburants: Carburant[] | null | undefined): number {
    return (carburants ?? []).reduce((total, carburant) => total + carburant.approv, 0);
  }
}
