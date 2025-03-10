import {Component, OnInit,} from '@angular/core';
import {Affectation} from '../../modeles/Affectation';
import {FormsModule} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {AffectationService} from '../../services/affectation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Carburant} from '../../modeles/Carburant';
import {MatDialog} from '@angular/material/dialog';
import {ModifierAffectationComponent} from '../modifier-affectation/modifier-affectation.component';


@Component({
  selector: 'app-liste-affectations',
    imports: [
        FormsModule,

        MatIconButton,
        MatInput,
        NgForOf,
        NgIf,
        DatePipe
    ],
  templateUrl: './liste-affectation.component.html',
  styleUrl: './liste-affectation.component.css'
})
export class ListeAffectationComponent implements OnInit {
  message = "";
  affectations: Affectation[] = [];
  filterTerm = '';
  affectationsFiltre: Affectation[] = [];

  constructor(
    private service: AffectationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chargerAffectations();
  }

  private chargerAffectations(): void {
    this.service.listeAffectations().subscribe({
      next: (data) => {
        if (Array.isArray(data.affectation)) {
          this.affectations = data.affectation;
          this.affectationsFiltre = [...this.affectations];
        } else {
          this.affectations = [];
          this.affectationsFiltre = [];
        }
        this.message = data.message || "";
      },
      error: (error) => {
        this.snackBar.open("Erreur lors du chargement des affectations", "Fermer", { duration: 3000 });
        console.error(error);
      }
    });
  }

  filterAffectations(): void {
    if (this.filterTerm.trim()) {
      const term = this.filterTerm.toLowerCase();
      this.affectationsFiltre = this.affectations.filter(affectation => {
        return (
          affectation.vehicule?.immatriculation?.toLowerCase().includes(term) ||
          affectation.chauffeur?.nom_complet?.toLowerCase().includes(term) ||
          affectation.chauffeur?.telephone?.toLowerCase().includes(term)
        );
      });
    } else {
      this.affectationsFiltre = [...this.affectations];
    }
  }

  modifier(affectation: Affectation): void {
    const dialogRef = this.dialog.open(ModifierAffectationComponent, {
      data: affectation,
      width: "900px",
      height: "600px"
    });

    dialogRef.afterClosed().subscribe(() => {
      this.chargerAffectations();
    });
  }


  totalCarburant(carburants: Carburant[] | null | undefined): number {
    return (carburants ?? []).reduce((total, carburant) => total + carburant.approv, 0);
  }
}
