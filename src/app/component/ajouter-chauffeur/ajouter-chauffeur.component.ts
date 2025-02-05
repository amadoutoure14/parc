import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-ajouter-chauffeur',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './ajouter-chauffeur.component.html',
  styleUrl: './ajouter-chauffeur.component.css'
})
export class AjouterChauffeurComponent implements OnInit {
  chauffeurForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.chauffeurForm = this.fb.group({
      nom_complet: ['', Validators.required],
      permis: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]], // Validation pour un numéro de téléphone de 8 chiffres
    });
  }

  onSubmit(): void {
    if (this.chauffeurForm.valid) {
      console.log('Formulaire soumis', this.chauffeurForm.value);
      // Logique pour envoyer les données du formulaire à un service ou backend
    } else {
      console.log('Formulaire invalide');
    }
  }
}
