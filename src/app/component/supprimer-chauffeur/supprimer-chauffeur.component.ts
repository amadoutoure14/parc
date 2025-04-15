import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {ChauffeurService} from '../../services/chauffeur.service';
import {Chauffeur} from '../../modeles/Chauffeur';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-supprimer-chauffeur',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './supprimer-chauffeur.component.html',
  styleUrl: './supprimer-chauffeur.component.css'
})
export class SupprimerChauffeurComponent {

  constructor(
    public dialogRef: MatDialogRef<SupprimerChauffeurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chauffeur: Chauffeur },
    private service: ChauffeurService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.service.supprimer(this.data.chauffeur).subscribe({
      next: () => {
        this.dialogRef.close('confirm');
      }
    });
  }
}
