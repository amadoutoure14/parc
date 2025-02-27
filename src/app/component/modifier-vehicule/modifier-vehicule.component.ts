import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {VehiculeService} from '../../services/vehicule.service';
import {Vehicule} from '../../modeles/Vehicule';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe, NgIf} from '@angular/common';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  selector: 'app-modifier-vehicule',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './modifier-vehicule.component.html',
  styleUrl: './modifier-vehicule.component.css'
})
export class ModifierVehiculeComponent {
  vehiculeForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModifierVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.vehiculeForm = this.fb.group({
      immatriculation: [data.vehicule.immatriculation, [Validators.required]],
      modele: [data.vehicule.modele, [Validators.required]],
      commentaire: [data.vehicule.commentaire],
      debut_location: [data.vehicule.debut_location, [Validators.required]],
      fin_location: [data.vehicule.fin_location, [Validators.required]]
    });
  }


  saveChanges() {
    this.submitted = true;
    if (this.vehiculeForm.valid) {
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
