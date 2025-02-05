import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-ajouter-sortie',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './ajouter-sortie.component.html',
  styleUrl: './ajouter-sortie.component.css'
})
export class AjouterSortieComponent {
  sortieForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.sortieForm = this.fb.group({
      affectation: [null, Validators.required], // Remplacer par le bon type si nécessaire
      dateArrivee: ['', Validators.required],
      dateDepart: ['', Validators.required],
      destination: ['', Validators.required],
      duree: [null, [Validators.required, Validators.min(0)]],
      objet: ['', Validators.required]
    });
  }

  onSubmit(): void {
  }
}
