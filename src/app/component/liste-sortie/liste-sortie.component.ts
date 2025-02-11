import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-liste-sortie',
  imports: [
    MatIcon,
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
}
