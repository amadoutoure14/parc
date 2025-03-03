import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {Carburant} from '../../modeles/Carburant';
import {CarburantService} from '../../services/carburant.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modifier-carburant',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './modifier-carburant.component.html',
  styleUrl: './modifier-carburant.component.css'
})
export class ModifierCarburantComponent implements OnInit{

  vehicules: Vehicule[]=[];
  carburant:Carburant;
  message="";

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ModifierCarburantComponent>, private vehiculeService:VehiculeService,private service:CarburantService,private snackbar:MatSnackBar) {
    this.carburant = data;
  }

  onSubmit() {
    this.service.patch(this.carburant).subscribe({
      next: (data) => {
        this.closeDialog();
          this.snackbar.open(data.message,"Fermer",{duration:3000});
        },
      error: (error) => {
        this.snackbar.open(error.message,"Fermer",{duration:3000});
      }
    })
  }


  ngOnInit(): void {
    this.vehiculeService.listeVehicule().subscribe({
      next: (data) => {
        this.vehicules = data.vehicule;
      },
      error: (error) => {
        console.log(error);
      }
    });

    if (!this.data) {
      this.data = { vehicule: null, approv: null };
    }
  }


  closeDialog() {
    this.dialogRef.close();
  }

}
