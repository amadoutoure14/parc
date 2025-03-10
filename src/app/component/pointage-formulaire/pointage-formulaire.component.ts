import {Component, OnInit} from '@angular/core';
import {VehiculeService} from '../../services/vehicule.service';
import {Vehicule} from '../../modeles/Vehicule';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-pointage-formulaire',
  imports: [
    FormsModule,
    MatButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './pointage-formulaire.component.html',
  styleUrl: './pointage-formulaire.component.css'
})
export class PointageFormulaireComponent implements OnInit {
   vehicules: Vehicule[]=[];

  constructor(private VehiculeService:VehiculeService, private snackBar: MatSnackBar) {
  }

  cocher: boolean=false;

  ngOnInit(): void {
    this.VehiculeService.listeVehiculeParc().subscribe({next: (data: any) => {this.vehicules = data.vehicule;this.snackBar.open(data.message,"Fermer",{duration:3000})}});
  }

  submit(vehicule: Vehicule) {
 if (this.cocher){
   console.log(vehicule);
   this.cocher=false
 }
  }
}
