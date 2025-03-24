import {Component, Inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {PointageVehiculeService} from '../../services/pointage-vehicule.service';

@Component({
  selector: 'app-supprimer-pointage',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './supprimer-pointage-vehicule.component.html',
  styleUrl: './supprimer-pointage-vehicule.component.css'
})
export class SupprimerPointageVehiculeComponent {

  constructor(
    public dialogRef: MatDialogRef<SupprimerPointageVehiculeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private service: PointageVehiculeService
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
