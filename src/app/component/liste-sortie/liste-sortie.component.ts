import {Component, OnInit} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {ModifierSortieComponent} from '../modifier-sortie/modifier-sortie.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-liste-sortie',
  imports: [
    MatIconButton,
    NgIf,
    NgForOf,
    DatePipe
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './liste-sortie.component.html',
  styleUrl: './liste-sortie.component.css'
})
export class ListeSortieComponent implements OnInit {

  sorties: Sortie[] = [];
  filtreSorties: Sortie[] = [];
  message="";

  constructor(
    private service: SortieService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.listeSortie().subscribe({
      next: data => {
        if (data.sortie && data.sorties.length > 0) {
          this.sorties = data.sortie;
          this.filtreSorties=[...this.sorties]
          this.message=data.message;
        }else {
          this.sorties=[]
          this.filtreSorties=[]
          this.message=data.message;
        }
      }
    });
  }

  modifier(sortie: Sortie): void {
    const dialogRef = this.dialog.open(
      ModifierSortieComponent, {
        width: '800px',
        height: '640px',
        data: { sortie }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
}
