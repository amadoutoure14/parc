import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {PointageChauffeurService} from '../../services/pointage-chauffeur.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-supprimer-pointage-chaffeur',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './supprimer-pointage-chaffeur.component.html',
  styleUrl: './supprimer-pointage-chaffeur.component.css'
})
export class SupprimerPointageChaffeurComponent {
  constructor(
    public dialogRef: MatDialogRef<SupprimerPointageChaffeurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private service: PointageChauffeurService
  ) {}


  onNoClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.service.supprimer(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close('confirm');
      },
      error: (error) => {
        console.error();
      }
    });
  }

}
