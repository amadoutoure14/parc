import {afterRender, afterRenderEffect, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
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
  private isFormatting = false;
  constructor(private fb: FormBuilder, private service: VehiculeService, private snackBar: MatSnackBar) {
    const elementRef = inject(ElementRef);
    elementRef.nativeElement.querySelector('immatrucilation')?.setStyle('color', 'red');
  }

  ngOnInit(): void {
    this.vehiculeForm = this.fb.group({
      immatriculation: [
        '',
        Validators.required,
      ],
      modele: ['', Validators.required],
      commentaire: ['']
    });
  }
  formatImmatriculation(event: Event): void {
    if (this.isFormatting) return;

    const input = event.target as HTMLInputElement;
    const rawValue = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const previousValue = this.vehiculeForm.get('immatriculation')?.value || '';

    // Si l'utilisateur supprime tout, ne pas reformater
    if (rawValue.length <= 2) return;

    let formatted = '';
    if (rawValue.length <= 7) {
      // Format AB 123 CD
      let AA = rawValue.substring(0, 2);
      let BB = rawValue.substring(2, 5);
      let CC = rawValue.substring(5, 7);

      formatted = AA;
      if (BB) formatted += ' ' + BB;
      if (CC) formatted += ' ' + CC;
    } else {
      // Format AB 1234 CD
      let AA = rawValue.substring(0, 2);
      let BB = rawValue.substring(2, 6);
      let CC = rawValue.substring(6, 8);

      formatted = AA;
      if (BB) formatted += ' ' + BB;
      if (CC) formatted += ' ' + CC;
    }

    // Appliquer le format seulement si différent pour éviter blocage
    if (formatted !== previousValue) {
      this.isFormatting = true;
      this.vehiculeForm.get('immatriculation')?.setValue(formatted, { emitEvent: false });

      // Repositionner le curseur en fin
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = formatted.length;
        this.isFormatting = false;
      });
    }
  }

  onSubmit(): void {
    if (this.vehiculeForm.valid) {
      this.service.enregistrerVehicule(this.vehiculeForm.value).subscribe({
        next: () => {
          this.snackBar.open('Véhicule enregistré avec succès', 'Fermer', { duration: 3000 });
          this.vehiculeForm.reset();
        },
        error: () => {
          this.snackBar.open('Erreur lors de l\'enregistrement', 'Fermer', { duration: 3000 });
        }
      });
    }
  }



}
