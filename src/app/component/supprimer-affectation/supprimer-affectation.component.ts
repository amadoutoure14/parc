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
import {AffectationService} from '../../services/affectation.service';
import {Affectation} from '../../modeles/Affectation';

@Component({
  selector: 'app-supprimer-affectation',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './supprimer-affectation.component.html',
  styleUrl: './supprimer-affectation.component.css'
})
export class SupprimerAffectationComponent {

  constructor(
    public dialogRef: MatDialogRef<SupprimerAffectationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { affectation: Affectation },
    private service: AffectationService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.service.supprimer(this.data.affectation).subscribe({
      next: () => {
        this.dialogRef.close('resultat');
      }
    });
  }
}
