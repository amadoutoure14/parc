import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Affectation } from '../../modeles/Affectation';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { AffectationService } from '../../services/affectation.service';
import { SortieService } from '../../services/sortie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sortie } from '../../modeles/Sortie';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-ajouter-sortie',
  providers: [DatePipe],
  templateUrl: './ajouter-sortie.component.html',
  imports: [
    MatOption,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    NgForOf,
    MatLabel,
    NgIf,
    DatePipe,
    FormsModule
  ],
  styleUrl: './ajouter-sortie.component.css'
})
export class AjouterSortieComponent implements OnInit {
  affectations: Affectation[] = [];
  sortieForm!: FormGroup;
  id!: number;
  date!: Date;

  constructor(private affectationService:AffectationService,private service: SortieService, private snackbar: MatSnackBar, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.sortieForm = this.fb.group({
      affectation: [null, Validators.required],
      objet: ['', Validators.required],
      destination: ['', Validators.required],
      date_debut: ['', Validators.required],
      lieu_depart: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.sortieForm.invalid) {
      this.showSnackbar('Veuillez remplir tous les champs requis.');
      return;
    }

    const sortie: Sortie = this.sortieForm.value;

    this.service.enregistrer(sortie).subscribe({
      next: (response) => {
        this.showSnackbar(response.message || 'Sortie enregistrée avec succès.');
        this.sortieForm.reset();
      }
    });
  }

  private showSnackbar(message: string) {
    this.snackbar.open(message, 'Fermer', { duration: 5000 });
  }

  submit() {
   if (!this.date){
     this.affectations= []
     this.snackbar.open("Sélectionner une date !","Fermer",{duration: 3000,})
   }
   this.affectationService.affectationDate(this.date).subscribe({
     next: (response) => {
       if (response.affectation){
         this.affectations=response.affectation
         this.snackbar.open(`${response.message} disponible dans les options !`, "Fermer",{duration: 3000})
       }else {
         this.snackbar.open(response.message, "Fermer",{duration: 3000})
       }

     }
   })

  }
}

