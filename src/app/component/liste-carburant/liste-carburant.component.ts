import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Carburant} from '../../modeles/Carburant';
import {CarburantService} from '../../services/carburant.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-liste-carburant',
  imports: [
    MatIcon,
    MatIconButton,
    MatInput,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './liste-carburant.component.html',
  styleUrl: './liste-carburant.component.css'
})
export class ListeCarburantComponent implements OnInit {

  carburants: Carburant[]=[];

  constructor(private service:CarburantService, private snackbar: MatSnackBar) {
  }

  filterTerm='';
  carburantsFiltre: Carburant[]=[];
  message=""

  filterCarburants() {
    if (this.filterTerm.trim()) {
      this.carburantsFiltre = this.carburants.filter(
        carburant => carburant.vehicule?.immatriculation.toLowerCase().includes(this.filterTerm.trim().toLowerCase())
      );
    } else {
      this.carburantsFiltre = [...this.carburants];
    }
  }


  modifier() {

  }

  delete() {

  }

  ngOnInit(): void {
    this.service.listeApprov().subscribe({
      next: (data) => {
        this.carburants=data.carburant;
        this.carburantsFiltre=this.carburants;
        this.message=data.message;
        this.snackbar.open(data.message,"Fermer",{duration:3000})
      }
    })
  }
}
