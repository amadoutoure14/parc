import {Component, } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {IChauffeur} from '../../interfaces/IChauffeur';

@Component({
  selector: 'app-liste-affectations',
  imports: [
    NgForOf,
    NgIf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './liste-affectation.component.html',
  styleUrl: './liste-affectation.component.css'
})
export class ListeAffectationComponent {
  chauffeurs: IChauffeur[] = [
    {
      id: 1,
      nom_complet: 'Jean Dupont',
      permis: 'B',
      telephone: '0102030405',
      date: '2023-01-15'
    },
    {
      id: 2,
      nom_complet: 'Marie Curie',
      permis: 'C',
      telephone: '0607080910',
      date: '2022-03-22'
    },
    {
      id: 3,
      nom_complet: 'Paul Martin',
      permis: 'B',
      telephone: '0712345678',
      date: '2021-06-30'
    }
  ];

  deleteChauffeur(chauffeur: IChauffeur) {

  }

  editChauffeur(chauffeur: IChauffeur) {

  }
}
