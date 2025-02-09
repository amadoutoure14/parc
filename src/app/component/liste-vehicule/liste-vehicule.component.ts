import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {Vehicule} from '../../modeles/Vehicule';
import {MatSnackBar} from '@angular/material/snack-bar';
import {VehiculeService} from '../../services/vehicule.service';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-liste-vehicule',
  imports: [
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf,
    FormsModule,
    MatInput
  ],
  templateUrl: './liste-vehicule.component.html',
  styleUrl: './liste-vehicule.component.css'
})
export class ListeVehiculeComponent implements OnInit {

  vehicules: Vehicule[] = [];
  filtrevehicules: Vehicule[] = [];
  filterTerm='';

  constructor(private snackBar: MatSnackBar, private service: VehiculeService) {
  }

  editVehicule(vehicule: Vehicule) {
    console.log('Édition du véhicule:', vehicule);
  }

  deleteVehicule(vehicule: Vehicule) {
    this.vehicules = this.vehicules.filter(v => v.id !== vehicule.id);
    console.log('Véhicule supprimé:', vehicule);
  }

  ngOnInit(): void {
    this.service.listeVehicule().subscribe({
      next: (data: Vehicule[]) => {
        this.vehicules = data;
        this.filtrevehicules=data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  filterVehicules() {
    if (this.filterTerm){
      this.filtrevehicules = this.vehicules.filter(
        vehicule =>
          vehicule.modele.toLowerCase().includes(this.filterTerm.toLowerCase())||
          vehicule.immatriculation.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    }else {
      this.filtrevehicules=[...this.vehicules]
    }
  }
}
