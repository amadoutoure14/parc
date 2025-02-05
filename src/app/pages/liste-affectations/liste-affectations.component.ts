import {Component, } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Chauffeur} from '../../modeles/Chauffeur';

@Component({
  selector: 'app-liste-affectations',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './liste-affectations.component.html',
  styleUrl: './liste-affectations.component.css'
})
export class ListeAffectationsComponent {
  chauffeurs: Chauffeur[] = [
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
}
