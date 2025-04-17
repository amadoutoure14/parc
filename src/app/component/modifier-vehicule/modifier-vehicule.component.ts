import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {VehiculeService} from '../../services/vehicule.service';

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

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModifierVehiculeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: VehiculeService, private snackBar: MatSnackBar
  ) {
    this.vehiculeForm = this.fb.group({
      id: [data.vehicule.id],
      immatriculation: [data.vehicule.immatriculation],
      modele: [data.vehicule.modele],
      commentaire: [data.vehicule.commentaire]
    });
  }

  saveChanges() {
    this.submitted = true;

    if (this.vehiculeForm.valid) {
      const changes = this.getModifiedFields();

      if (Object.keys(changes).length > 0) {
        this.service.patchVehicule(changes).subscribe({
          next: (data) => {
            this.snackBar.open(data.message, "Fermer", { duration: 3000 });
            this.dialogRef.close('confirm');
          }
        });
      } else {
        this.snackBar.open("Aucune modification détectée", "Fermer", { duration: 3000 });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  private getModifiedFields() {
    const modifiedFields: any = {
      id: this.vehiculeForm.value.id,
    };

    if (this.vehiculeForm.value.immatriculation !== this.data.vehicule.immatriculation) {
      modifiedFields.immatriculation = this.vehiculeForm.value.immatriculation;
    }
    if (this.vehiculeForm.value.modele !== this.data.vehicule.modele) {
      modifiedFields.modele = this.vehiculeForm.value.modele;
    }
    if (this.vehiculeForm.value.commentaire !== this.data.vehicule.commentaire) {
      modifiedFields.commentaire = this.vehiculeForm.value.commentaire;
    }
    if (this.vehiculeForm.value.debut_location !== this.data.vehicule.debut_location) {
      modifiedFields.debut_location = this.vehiculeForm.value.debut_location;
    }
    if (this.vehiculeForm.value.fin_location !== this.data.vehicule.fin_location) {
      modifiedFields.fin_location = this.vehiculeForm.value.fin_location;
    }

    return modifiedFields;
  }
}


