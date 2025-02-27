import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {VehiculeService} from '../../services/vehicule.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-ajouter-vehicule',
  templateUrl: './ajouter-vehicule.component.html',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrls: ['./ajouter-vehicule.component.css']
})
export class AjouterVehiculeComponent implements OnInit {
  vehiculeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: VehiculeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vehiculeForm = this.fb.group({
      immatriculation: ['', Validators.required],
      modele: ['', Validators.required],
      debut_location: ['', Validators.required],
      fin_location: ['', Validators.required],
      commentaire: ['']
    });
  }

  onSubmit(): void {
    if (this.vehiculeForm.valid) {
      this.service.enregistrerVehicule(this.vehiculeForm.value).subscribe({
        next: () => {
          this.snackBar.open('Véhicule enregistré avec succès', 'Fermer', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Erreur lors de l\'enregistrement', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}
