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
  templateUrl: './index-vehicule.component.html',
  providers:[DatePipe],
    imports: [
        FormsModule,
        MatButton,
        MatIcon,
        NgForOf,
        NgIf,
        NgClass
    ],
  styleUrls: ['./index-vehicule.component.css']
})
export class IndexVehiculeComponent {

  debut: string = '';
  fin: string = '';
  vehicules: Vehicule[] = [];
  filtrevehicules: Vehicule[] = [];
  filterTerm = '';
  message="";

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
          this.message=data.message;
        }else {
          this.vehicules = data.vehicule;
          this.filtrevehicules = this.vehicules;
          this.message=data.message;
          this.snackBar.open(data.message,'Fermer',  { duration: 3000 });
        }
      }
    })
  }

  getTotalCarburant(carburants: Carburant[] | null | undefined): number {
    return (carburants ?? []).reduce((total, carburant) => total + carburant.approv, 0);
  }
}
