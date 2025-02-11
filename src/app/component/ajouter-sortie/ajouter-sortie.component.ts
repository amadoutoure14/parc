import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Affectation} from '../../modeles/Affectation';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {AffectationService} from '../../services/affectation.service';
import {SortieService} from '../../services/sortie.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Sortie} from '../../modeles/Sortie';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-ajouter-sortie',
  providers:[DatePipe],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    MatLabel,
  ],
  templateUrl: './ajouter-sortie.component.html',
  styleUrl: './ajouter-sortie.component.css'
})
export class AjouterSortieComponent implements OnInit {
  affectations: Affectation[] = [];
  sortie: Sortie = new Sortie(null, null, '', '', '', '', null);  // Initialisation de l'objet Sortie

  constructor(
    private affectationService: AffectationService,
    private datePipe: DatePipe,
    private service: SortieService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.affectationService.listeAffectations().subscribe({
      next: (data) => {
        this.affectations = data;
      }
    });
  }

  onSubmit(): void {
    // Vérifier que l'affectation est bien définie avant de soumettre
    if (!this.sortie.affectation) {
      this.snackbar.open("L'affectation est requise", "Fermer", { duration: 3000 });
      return;
    }

    const sortie = new Sortie(
      null, // ID
      this.sortie.affectation, // Affectation
      this.sortie.objet, // Objet
      this.sortie.destination, // Destination
      this.sortie.arrivee, // Arrivée
      this.sortie.depart, // Départ
      null // Date
    );
    console.log(sortie);

    // Uncomment and implement the service call for saving the "sortie"
    /*
    this.service.enregistrer(sortie).subscribe({
      next: () => {
        this.snackbar.open("Sortie enregistrée avec succès !", "Fermer", { duration: 3000 });
        this.sortieForm.reset();
      },
      error: (error) => {
        console.log(error);
        this.snackbar.open(`L'erreur ${error} est survenue !`, "Fermer", { duration: 3000 });
      }
    });
    */
  }
}

