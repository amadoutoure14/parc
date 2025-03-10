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
import {AffectationService} from '../../services/affectation.service';

@Component({
  selector: 'app-modifier-sortie',
  providers: [DatePipe],
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
  affectations: Affectation[] = [];
  derniereSortie: Sortie | null = null;

  constructor(
    public dialogRef: MatDialogRef<ModifierSortieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sortie: Sortie },
    private fb: FormBuilder,
    private service: SortieService,
    private snackbar: MatSnackBar,
    private affectationService: AffectationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const dateFin = this.data.sortie?.date_fin ? this.datePipe.transform(this.data.sortie.date_fin, 'yyyy-MM-ddTHH:mm') : '';
    const dateDebut = this.data.sortie?.date_debut ? this.datePipe.transform(this.data.sortie.date_debut, 'yyyy-MM-ddTHH:mm') : '';
    this.sortieForm = this.fb.group({
      objet: [this.data.sortie?.objet || '', Validators.required],
      destination: [this.data.sortie?.destination || '', Validators.required],
      lieu_depart: [this.data.sortie?.lieu_depart || '', Validators.required],
      date_debut: [dateDebut, Validators.required],
      date_fin: [dateFin, Validators.required],
      affectation: [this.data.sortie?.affectation || null, Validators.required]
    });

    this.affectationService.listeAffectations().subscribe({
      next: (data) => {
        this.affectations = data.affectation;
        this.setDerniereSortie();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des affectations', err);
        this.showSnackbar("Erreur lors du chargement des affectations.");
      }
    });
  }

  setDerniereSortie(): void {
    const affectationId = this.sortieForm.get('affectation')?.value?.id;
    if (affectationId) {
      this.service.derniereSortie(affectationId).subscribe({
        next: (data) => {
          this.derniereSortie = data?.sortie || null;
        },
        error: (err) => {
          console.error("Erreur lors de la récupération de la dernière sortie", err);
          this.derniereSortie = null;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.sortieForm.invalid) {
      this.showSnackbar('Veuillez remplir tous les champs requis.');
      return;
    }

    this.service.patch(this.data.sortie.id,this.sortieForm.value).subscribe({
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

  terminer() {
    this.service.terminer(this.data.sortie).subscribe(
      {
        next:(data) => {
          this.dialogRef.close(true);
          this.snackbar.open(data.message, 'Fermer', {duration: 3000})
        }
      });
  }

}

