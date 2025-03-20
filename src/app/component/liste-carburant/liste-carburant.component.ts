import {Component, OnInit} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Carburant} from '../../modeles/Carburant';
import {CarburantService} from '../../services/carburant.service';
import {MatDialog} from '@angular/material/dialog';
import {ModifierCarburantComponent} from '../modifier-carburant/modifier-carburant.component';
import {SuppressionCarburantComponent} from '../suppression-carburant/suppression-carburant.component';

@Component({
  selector: 'app-liste-carburant',
    imports: [
        MatIconButton,
        MatInput,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        FormsModule,
        DatePipe
    ],
  templateUrl: './liste-carburant.component.html',
  styleUrl: './liste-carburant.component.css'
})
export class ListeCarburantComponent implements OnInit {

  carburants: Carburant[] = [];
  carburantsFiltre: Carburant[] = [];
  filterTerm = '';
  message = '';

  constructor(private service: CarburantService, public dialog: MatDialog) {}

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
        this.loadCarburants();
      }
    });
  }

  ngOnInit(): void {
    this.loadCarburants();
  }

  loadCarburants(): void {
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
  supprimer(carburant: Carburant): void {
    const dialogRef = this.dialog.open(SuppressionCarburantComponent, {
      width:"500",maxWidth:600,
      data: { carburant }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.loadCarburants();
      }
    });
  }


}


