import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Vehicule} from '../../modeles/Vehicule';

@Component({
  selector: 'app-ajouter-vehicule',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './ajouter-vehicule.component.html',
  styleUrl: './ajouter-vehicule.component.css'
})
export class AjouterVehiculeComponent {
  vehiculeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.vehiculeForm = this.fb.group({
      immatriculation: ['', Validators.required],
      modele: ['', Validators.required],
      commentaire: [''],
      date: ['', Validators.required],
      disponible: [true, Validators.required]
    });
  }

  onSubmit() {

  }
}
