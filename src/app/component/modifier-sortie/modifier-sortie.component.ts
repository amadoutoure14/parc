import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SortieService} from '../../services/sortie.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatError } from '@angular/material/form-field';
import {Affectation} from '../../modeles/Affectation';
import {DatePipe, NgIf } from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {AffectationService} from '../../services/affectation.service';

@Component({
  selector: 'app-modifier-sortie',
  providers: [DatePipe],
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatError
  ],
  templateUrl: './modifier-sortie.component.html',
  styleUrl: './modifier-sortie.component.css'
})
export class ModifierSortieComponent implements OnInit {
  sortieForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModifierSortieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sortie: Sortie },
    private fb: FormBuilder,
    private service: SortieService,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const dateFin = this.data.sortie?.date_fin ? this.datePipe.transform(this.data.sortie.date_fin, 'yyyy-MM-ddTHH:mm') : '';
    const dateDebut = this.data.sortie?.date_debut ? this.datePipe.transform(this.data.sortie.date_debut, 'yyyy-MM-ddTHH:mm') : '';

    this.sortieForm = this.fb.group({
      objet: [this.data.sortie?.objet],
      destination: [this.data.sortie?.destination],
      lieu_depart: [this.data.sortie?.lieu_depart],
      date_debut: [dateDebut],
      date_fin: [dateFin],
    });

  }

  onSubmit(): void {
    if (this.sortieForm.invalid) {
      this.showSnackbar('Veuillez remplir tous les champs requis.');
      return;
    }

    this.service.patch(this.data.sortie.id, this.sortieForm.value).subscribe({
      next: (response) => {
        this.showSnackbar(response.message || 'Sortie modifiée avec succès.');
        this.dialogRef.close(true);
      }
    });
  }

  annuler(): void {
    this.dialogRef.close();
  }

  terminer(): void {
    this.service.terminer(this.data.sortie).subscribe({
      next: (data) => {
        this.dialogRef.close(true);
        this.snackbar.open(data.message, 'Fermer', { duration: 3000 });
      }
    });
  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'Fermer', { duration: 5000 });
  }
}


