import { Component } from '@angular/core';
import {IChauffeur} from '../../interfaces/IChauffeur';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-presence-chauffeur',
  imports: [
    NgIf,
    NgForOf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './presence-chauffeur.component.html',
  styleUrl: './presence-chauffeur.component.css'
})
export class PresenceChauffeurComponent {
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
  value: string = 'clear';

  deleteChauffeur(chauffeur: IChauffeur) {

  }

  editChauffeur(chauffeur: IChauffeur) {

  }
}
