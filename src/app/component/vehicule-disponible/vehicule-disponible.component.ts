import {Component, OnInit} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Carburant} from '../../modeles/Carburant';

import {window} from 'rxjs';


@Component({
  selector: 'app-vehicule-disponible',
  standalone: true,
  providers:[DatePipe],
  imports: [MatTableModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule, NgForOf, NgIf, NgClass],
  templateUrl: './vehicule-disponible.component.html',
  styleUrls: ['./vehicule-disponible.component.css']
})
export class VehiculeDisponibleComponent implements OnInit{

  date: string = '';
  vehicules: Vehicule[] = [];
  filtrevehicules: Vehicule[] = [];
  filterTerm = '';

  constructor(private service: VehiculeService,private datePipe:DatePipe, private snackBar:MatSnackBar) { }
  imprimerVehiculeDisponibleDate(date: string) {

    if (!date) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    const formatted = this.datePipe.transform(date,'dd/MM/yyyy');
    if (formatted){
      this.service.imprimerVehiculeDisponibleDate(formatted).subscribe({
        next:response => {
          const blob = new Blob([response], { type: 'application/pdf' });
          // @ts-ignore
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `La_liste_des_véhicules_disponible_au_${date}.pdf`;
          a.click();

          // @ts-ignore
          window.URL.revokeObjectURL(url);

          this.snackBar.open('Le PDF est en téléchargement.', 'Fermer', { duration: 3000 });

        },
        error:err => this.snackBar.open('Erreur de chargement'+err,'Fermer',{duration:3000})
      })
    }

  }

  edit() {

  }

  ngOnInit(): void {
    this.service.vehiculeDispo().subscribe({
      next: (data) => {
        this.vehicules = data.vehicule;
        this.filtrevehicules=this.vehicules
        this.snackBar.open(data.message,'Fermer',{duration:3000})
      },
      error: (data) => {
        this.snackBar.open(data.message, 'Fermer', { duration: 3000 });
      }
    })
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
