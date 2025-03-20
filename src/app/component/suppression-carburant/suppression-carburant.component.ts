import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {Carburant} from '../../modeles/Carburant';
import {CarburantService} from '../../services/carburant.service';

@Component({
  selector: 'app-suppression-dialog-component',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './suppression-carburant.component.html',
  styleUrl: './suppression-carburant.component.css'
})
export class SuppressionCarburantComponent {

  constructor(
    public dialogRef: MatDialogRef<SuppressionCarburantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { carburant: Carburant },
    private service: CarburantService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.service.supprimer(this.data.carburant).subscribe({
      next: () => {
        this.dialogRef.close('confirm');
      },
      error: (error) => {
        console.error("Erreur lors de la suppression:", error);
      }
    });
  }
}

