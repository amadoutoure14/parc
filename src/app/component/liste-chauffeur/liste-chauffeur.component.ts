import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {ChauffeurService} from '../../services/chauffeur.service';
import {Chauffeur} from '../../modeles/Chauffeur';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog';
import {ModifierChauffeurComponent} from '../modifier-chauffeur/modifier-chauffeur.component';

@Component({
  selector: 'app-liste-chauffeur',
  standalone: true,
    imports: [
        NgIf,
        NgForOf,
        MatIconButton,
        FormsModule,
        MatInput,
        DatePipe
    ],
  templateUrl: './liste-chauffeur.component.html',
  styleUrl: './liste-chauffeur.component.css'
})
export class ListeChauffeurComponent implements OnInit {
  chauffeurs: Chauffeur[] = [];
  filteredChauffeurs: Chauffeur[] = [];
  filterTerm: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(public service: ChauffeurService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getChauffeurs();
  }

  // Méthode pour récupérer la liste des chauffeurs
  private getChauffeurs(): void {
    this.service.listeChauffeur().subscribe({
      next: (data) => {
        this.chauffeurs = data.chauffeur || [];
        this.filteredChauffeurs = [...this.chauffeurs];
        this.message = data.message || '';
      },
      error: (error) => {
        console.error();
        this.errorMessage = 'Erreur de récupération des données des chauffeurs';
      }
    });
  }

  // Filtrer les chauffeurs
  filterChauffeurs(): void {
    if (this.filterTerm.trim()) {
      this.filteredChauffeurs = this.chauffeurs.filter(chauffeur =>
        chauffeur.nom_complet.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
        chauffeur.permis.includes(this.filterTerm) ||
        chauffeur.telephone.includes(this.filterTerm)
      );
    } else {
      this.filteredChauffeurs = [...this.chauffeurs];
    }
  }

  modifier(chauffeur: Chauffeur) {
    const dialogRef = this.dialog.open(ModifierChauffeurComponent, {
      data: { chauffeur: chauffeur },
      width: "700px",
      height: "385px",
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.service.listeChauffeur().subscribe({
          next: (data) => {
            this.chauffeurs = data.chauffeur || [];
            this.filteredChauffeurs = [...this.chauffeurs];
          }
        })
      }
    });
  }

}

