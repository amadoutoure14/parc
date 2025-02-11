import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Carburant} from '../../modeles/Carburant';
import {ApprovisionnementService} from '../../services/approvisionnement.service';

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

  constructor(private service:ApprovisionnementService) {
  }

  filterTerm='';
  carburantsFiltre: Carburant[]=[];

  filterCarburants() {
    if (this.filterTerm.trim()) {
      this.carburantsFiltre = this.carburants.filter(
        carburant => carburant.vehicule?.immatriculation.toLowerCase().includes(this.filterTerm.trim().toLowerCase())
      );
    } else {
      this.carburantsFiltre = [...this.carburants];
    }
  }


  edit() {

  }

  delete() {

  }

  ngOnInit(): void {
    this.service.listeApprov().subscribe({
      next: (data) => {
        this.carburantsFiltre=data;
        this.carburants=data;
      }
    })
  }
}
