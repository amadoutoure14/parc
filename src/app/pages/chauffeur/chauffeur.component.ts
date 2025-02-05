import { Component } from '@angular/core';
import { MatCardHeader} from "@angular/material/card";
import { RouterOutlet} from "@angular/router";
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {IChauffeur} from '../../interfaces/IChauffeur';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chauffeur',
  imports: [
    MatCardHeader,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf,
    MatButton,
    FormsModule,
  ],
  templateUrl: './chauffeur.component.html',
  styleUrl: './chauffeur.component.css'
})
export class ChauffeurComponent {
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
