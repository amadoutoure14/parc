import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChauffeurService} from '../../services/chauffeur.service';
import {Chauffeur} from '../../modeles/Chauffeur';
import {PointageChauffeurService} from '../../services/pointage-chauffeur.service';

@Component({
  selector: 'app-pointage-chauffeur-formulaire',
  imports: [
    MatButton,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './pointage-chauffeur-formulaire.component.html',
  styleUrl: './pointage-chauffeur-formulaire.component.css'
})
export class PointageChauffeurFormulaireComponent implements OnInit {
  chauffeurs: Chauffeur[] = [];
  date!: Date | null;

  constructor(
    private chauffeurService: ChauffeurService,
    private snackBar: MatSnackBar,
    private service: PointageChauffeurService
  ) {}

  ngOnInit(): void {
    this.chauffeurService.listeChauffeur().subscribe({
      next: (data: any) => {
        this.chauffeurs = data.chauffeur;
        this.snackBar.open(data.message, "Fermer", { duration: 3000 });
      }
    });
  }

  submit(chauffeur: Chauffeur) {
    if (chauffeur.cocher) {
      this.service.pointer(this.date, chauffeur.id).subscribe({
        next: (data: any) => {
          chauffeur.cocher = false;
          this.date = null;
          this.snackBar.open(data.message, "Fermer", { duration: 3000 });
        },
        error: (err) => {
          const errorMessage = err.error?.message || "Une erreur est survenue";
          this.snackBar.open(errorMessage, "Fermer", { duration: 3000 });
          chauffeur.cocher=false
        }
      });
    }
    this.date = null;
  }


  resetDate(chauffeur: Chauffeur) {
    if (!chauffeur.cocher) {
      this.date = null;
    }
  }

}
