import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from '@angular/material/button';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';

@Component({
  selector: 'app-supprimer-sortie',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './supprimer-sortie.component.html',
  styleUrl: './supprimer-sortie.component.css'
})
export class SupprimerSortieComponent {

  constructor(
    public dialogRef: MatDialogRef<SupprimerSortieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sortie: Sortie },
    private service: SortieService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.service.supprimer(this.data.sortie).subscribe({
      next: () => {
        this.dialogRef.close('confirm');
      }
    });
  }
}
