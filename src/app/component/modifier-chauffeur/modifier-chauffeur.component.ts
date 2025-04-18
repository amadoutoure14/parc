import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ChauffeurService} from '../../services/chauffeur.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Chauffeur} from '../../modeles/Chauffeur';

@Component({
  selector: 'app-modifier-chauffeur',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './modifier-chauffeur.component.html',
  styleUrl: './modifier-chauffeur.component.css'
})
export class ModifierChauffeurComponent {
  chauffeurForm: FormGroup;
  chauffeur: Chauffeur;

  constructor(
    private fb: FormBuilder,
    private service: ChauffeurService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ModifierChauffeurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.chauffeur = data.chauffeur;
    this.chauffeurForm = this.fb.group({
      nom_complet: [this.chauffeur.nom_complet || '', Validators.required],
      permis: [this.chauffeur.permis || '', Validators.required],
      telephone: [
        this.chauffeur.telephone || '',
        [Validators.required, Validators.pattern('^[0-9]{8}$')],
      ],
    });
  }

  onSubmit() {
    const updatedChauffeur = { ...this.chauffeur, ...this.chauffeurForm.value };
    this.service.patch(updatedChauffeur).subscribe({
      next: () => {
        this.dialogRef.close("confirm");
        this.snackBar.open("Chauffeur modifié avec succès !", "Fermer", { duration: 3000 });
      }
    });
  }


  close(): void {
    this.dialogRef.close();
  }
}
