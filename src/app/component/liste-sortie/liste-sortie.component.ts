import { Component } from '@angular/core';
import {Sortie} from '../../modeles/Sortie';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-liste-sortie',
  imports: [
    NgIf,
  ],
  templateUrl: './liste-sortie.component.html',
  styleUrl: './liste-sortie.component.css'
})
export class ListeSortieComponent {
  sorties: Sortie[] = [];

}
