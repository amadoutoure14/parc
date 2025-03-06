import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Carburant} from '../../modeles/Carburant';
import {ModifierSortieComponent} from '../modifier-sortie/modifier-sortie.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-liste-sortie',
  imports: [
    MatIconButton,
    NgIf,
    NgForOf,
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './liste-sortie.component.html',
  styleUrl: './liste-sortie.component.css'
})
export class ListeSortieComponent implements OnInit{

  constructor(private service : SortieService, private snackbar: MatSnackBar, private datePipe:DatePipe,private dialog: MatDialog) {
  }

  sorties: Sortie[] = [];


  modifier(sortie: any): void {
    const dialogRef = this.dialog.open(ModifierSortieComponent, {
      width: '800px',
      height:'600px',
      data: { sortie }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  ngOnInit(): void {
    this.service.listeSortie().subscribe({
      next: data => {
        this.sorties = data.sortie.map((sortie: Sortie) => ({
          ...sortie,
          date_debut: this.datePipe.transform(sortie.date_debut, 'dd/MM/yyyy HH:mm') || '',
          date_fin: this.datePipe.transform(sortie.date_fin, 'dd/MM/yyyy HH:mm') || ''
        }));
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
