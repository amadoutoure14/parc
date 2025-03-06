import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Carburant} from '../../modeles/Carburant';
import {CarburantService} from '../../services/carburant.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ModifierCarburantComponent} from '../modifier-carburant/modifier-carburant.component';

@Component({
  selector: 'app-liste-carburant',
  imports: [
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

  constructor(private service:CarburantService, public dialog: MatDialog) {
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

  modifier(carburant: Carburant) {
    const dialogRef = this.dialog.open(ModifierCarburantComponent, { data: carburant });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.listeApprov().subscribe({
          next: (data) => {
            this.carburants = data.carburant || [];
            this.carburantsFiltre = [...this.carburants];
          },
          error: (error) => console.error(error)
        });
      }
    });
  }




  ngOnInit(): void {
    this.service.listeApprov().subscribe({
      next: (data) => {
        this.carburants = data?.carburant || [];
        this.carburantsFiltre = [...this.carburants];
        this.message = data?.message || "Aucune donnée trouvée";
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


}
