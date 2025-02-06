import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {ChauffeurService} from '../../services/chauffeur.service';
import {Chauffeur} from '../../modeles/Chauffeur';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-presence-chauffeur',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatIcon,
    MatIconButton,
    FormsModule,
    MatInput
  ],
  templateUrl: './presence-chauffeur.component.html',
  styleUrl: './presence-chauffeur.component.css'
})
export class PresenceChauffeurComponent implements OnInit {
  chauffeurs: Chauffeur[] = [];
  filteredChauffeurs: Chauffeur[] = [];
  filterTerm: string = '';

  constructor(private chauffeurService: ChauffeurService) {}

  ngOnInit(): void {
    this.chauffeurService.listeChauffeur().subscribe({
      next: (data: Chauffeur[]) => {
        this.chauffeurs = data;
        this.filteredChauffeurs = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des chauffeurs', error);
      }
    });
  }

  filterChauffeurs(): void {
    if (this.filterTerm.trim()) {
      // On filtre seulement si le terme de recherche est non vide
      this.filteredChauffeurs = this.chauffeurs.filter(chauffeur =>
        chauffeur.nom_complet.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
        chauffeur.permis.includes(this.filterTerm) || chauffeur.telephone.includes(this.filterTerm)|| chauffeur.date.includes(this.filterTerm)
      );
    } else {
      this.filteredChauffeurs = [...this.chauffeurs];
    }
  }

  editChauffeur(chauffeur: Chauffeur): void {
    console.log('Éditer chauffeur:', chauffeur);
    // Implémenter la logique d'édition ici
  }

  deleteChauffeur(chauffeur: Chauffeur): void {
    console.log('Supprimer chauffeur:', chauffeur);
    // Implémenter la logique de suppression ici
  }
}
