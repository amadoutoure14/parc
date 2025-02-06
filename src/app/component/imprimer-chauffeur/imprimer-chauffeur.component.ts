import {Component, OnInit} from '@angular/core';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {ChauffeurService} from '../../services/chauffeur.service';
import {MatIcon} from '@angular/material/icon';
import {NgForOf, NgIf} from '@angular/common';
import {Chauffeur} from '../../modeles/Chauffeur';

@Component({
  selector: 'app-imprimer-chauffeur',
  imports: [
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatButton,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './imprimer-chauffeur.component.html',
  styleUrl: './imprimer-chauffeur.component.css'
})
export class ImprimerChauffeurComponent implements OnInit {
  filterTerm: any;
  filteredChauffeurs: Chauffeur[]=[];
  date!: string;


  constructor(private serviceChauffeurs:ChauffeurService) {
  }

  filterChauffeurs() {

  }

  editChauffeur(chauffeur: Chauffeur) {

  }

  deleteChauffeur(chauffeur: Chauffeur) {

  }

  ngOnInit(): void {
  }

  rechercher(date:string) {
  }
}
