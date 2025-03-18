import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Carburant} from '../../modeles/Carburant';
import {VehiculeService} from '../../services/vehicule.service';
import {Vehicule} from '../../modeles/Vehicule';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {CarburantService} from '../../services/carburant.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ModifierCarburantComponent} from '../modifier-carburant/modifier-carburant.component';
import {MatDialog} from '@angular/material/dialog';
import {MatDatepickerToggle, MatDateRangeInput, MatDateRangePicker} from '@angular/material/datepicker';

@Component({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  selector: 'app-rechercher-carburant',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    NgForOf,
    NgIf,
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    DatePipe
  ],
  templateUrl: './imprimer-carburant.component.html',
  styleUrl: './imprimer-carburant.component.css'
})
export class ImprimerCarburantComponent implements OnInit{

  constructor(private serviceVehicule:VehiculeService,private service:CarburantService,private snackBar:MatSnackBar, public dialog: MatDialog) {
  }
  vehicules: Vehicule[]=[];
  carburants: Carburant[]=[];

  carburantsFiltre: Carburant[]=[];
  vehicule!: Vehicule;
  debut!: Date;
  fin!: Date;

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
    this.serviceVehicule.listeVehicule().subscribe({
      next: data => {
        this.vehicules = data.vehicule;
      }
    })
    this.service.listeApprov().subscribe({
      next: (data) => {
        this.carburants = data.carburant || [];
        this.carburantsFiltre = [...this.carburants];
      },
      error: (error) => console.error(error)
    });
  }


  imprimer(vehicule: Vehicule, debut: Date, fin: Date) {

  }


  rechercher(vehicule: Vehicule, debut: Date, fin: Date) {
    if (vehicule) {
      this.service.vehicule(vehicule.id).subscribe({
        next: (data) => {
          console.log(data.carburant)
          if (data.carburant) {
            this.carburantsFiltre = data.carburant;
          } else {
            this.carburantsFiltre = [];
          }
        },
        error: (error) => console.error(error)
      });
    }
    if (vehicule && debut && fin) {
      this.service.vehiculeDates(vehicule,debut,fin).subscribe({
        next: (data) => {
          this.carburantsFiltre = data.carburant || [];
        }
      })
    }
  }
}
