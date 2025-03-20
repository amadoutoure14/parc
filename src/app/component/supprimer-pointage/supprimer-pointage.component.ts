import {Component, Inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {PointageService} from '../../services/pointage.service';

@Component({
  selector: 'app-supprimer-pointage',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './supprimer-pointage.component.html',
  styleUrl: './supprimer-pointage.component.css'
})
export class SupprimerPointageComponent {

  constructor(
    public dialogRef: MatDialogRef<SupprimerPointageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private service: PointageService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.service.supprimer(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close('confirm');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
