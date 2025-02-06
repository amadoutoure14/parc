import { Component } from '@angular/core';
import {Sortie} from '../../modeles/Sortie';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-liste-sortie',
  imports: [
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './liste-sortie.component.html',
  styleUrl: './liste-sortie.component.css'
})
export class ListeSortieComponent {
  sorties: Sortie[] = [];

  editSortie() {

  }

  deleteSortie() {

  }
}
