import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {MatButton} from '@angular/material/button';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';

@Component({
  selector: 'app-supprimer-vehicule',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle
    ],
  templateUrl: './supprimer-vehicule.component.html',
  styleUrl: './supprimer-vehicule.component.css'
})
export class SupprimerVehiculeComponent {

  constructor(
    public dialogRef: MatDialogRef<SupprimerVehiculeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicule: Vehicule },
    private service: VehiculeService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.service.supprimer(this.data.vehicule).subscribe({
      next: () => {
        this.dialogRef.close('confirm');
      }
    });
  }
}
