import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SortieService} from '../../services/sortie.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {Affectation} from '../../modeles/Affectation';
import {DatePipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';

@Component({
  selector: 'app-modifier-sortie',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    NgIf,
    DatePipe,
    MatLabel,
    MatError,
    TitleCasePipe
  ],
  templateUrl: './modifier-sortie.component.html',
  styleUrl: './modifier-sortie.component.css'
})
export class ModifierSortieComponent implements OnInit {
  sortieForm!: FormGroup;
  affectations: Affectation[]=[];
  derniereSortie!: Sortie;

  constructor(
    public dialogRef: MatDialogRef<ModifierSortieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private sortieService: SortieService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sortieForm = this.fb.group({
      objet: [this.data.sortie.objet, Validators.required],
      destination: [this.data.sortie.destination, Validators.required],
      lieu_depart: [this.data.sortie.lieu_depart, Validators.required],
      date_debut: [this.data.sortie.date_debut, Validators.required],
      date_fin: [this.data.sortie.date_fin, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.sortieForm.invalid) {
      this.showSnackbar('Veuillez remplir tous les champs requis.');
      return;
    }

    // const updatedSortie = {
    //   ...this.data.sortie,
    //   ...this.sortieForm.value
    // };

    this.sortieService.patch().subscribe({
      next: (response) => {
        this.showSnackbar(response.message || 'Sortie modifiée avec succès.');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        const message = err.error?.message || "Erreur lors de la modification.";
        this.showSnackbar(message);
      }
    });
  }


  private showSnackbar(message: string) {
    this.snackbar.open(message, 'Fermer', { duration: 5000 });
  }

  annuler(): void {
    this.dialogRef.close();
  }
}
