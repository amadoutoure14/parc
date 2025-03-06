import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Vehicule} from '../../modeles/Vehicule';
import {Carburant} from '../../modeles/Carburant';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VehiculeService} from '../../services/vehicule.service';
import {CarburantService} from '../../services/carburant.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modifier-carburant',
  templateUrl: './modifier-carburant.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./modifier-carburant.component.css']
})
export class ModifierCarburantComponent implements OnInit {

  vehicules: Vehicule[] = [];
  carburant: Carburant;
  message = "";
  public approvForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModifierCarburantComponent>,
    private vehiculeService: VehiculeService,
    private carburantService: CarburantService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {

    this.carburant = data ? data : { vehicule: null, approv: null };
  }

  ngOnInit(): void {
    this.approvForm = this.fb.group({
      approv: [this.carburant.approv || '', [Validators.required, Validators.min(1)]]
    });

    // Load the list of vehicles
    this.vehiculeService.listeVehicule().subscribe({
      next: (data) => {
        this.vehicules = data?.vehicule || [];
      },
      error: (error) => {
        console.error(error);
        this.snackbar.open("Erreur de chargement des véhicules", "Fermer", { duration: 3000 });
      }
    });
  }

  // Handle the form submission
  onSubmit(): void {
    if (this.approvForm.invalid) return;

    this.carburant.approv = this.approvForm.get('approv')?.value;

    this.carburantService.patch(this.carburant).subscribe({
      next: (data) => {
        this.closeDialog();
        this.snackbar.open(data.message, "Fermer", { duration: 3000 });
      },
      error: (error) => {
        const errorMessage = error?.message || "Une erreur est survenue";
        this.snackbar.open(errorMessage, "Fermer", { duration: 3000 });
      }
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
}
