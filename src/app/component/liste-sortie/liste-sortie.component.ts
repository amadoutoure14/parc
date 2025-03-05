import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Carburant} from '../../modeles/Carburant';

@Component({
  selector: 'app-liste-sortie',
  imports: [
    MatIconButton,
    NgIf,
    NgForOf,
  ],
  templateUrl: './liste-sortie.component.html',
  styleUrl: './liste-sortie.component.css'
})
export class ListeSortieComponent implements OnInit{

  constructor(private service : SortieService, private snackbar: MatSnackBar) {
  }

  sorties: Sortie[] = [];

  edit() {

  }

  delete() {

  }

  ngOnInit(): void {
    this.service.listeSortie().subscribe({
      next: data => {
        this.sorties=data
      },
      error: err => {
        console.log(err);
      }
    })
  }

  totalCarburant(carburants: Carburant[] | null | undefined):number {
    return (carburants??[]).reduce((total, carburant) => total+carburant.approv,0);
  }
}
