import {Component, Inject, OnInit} from '@angular/core';
import {AffectationService} from '../../services/affectation.service';
import {VehiculeService} from '../../services/vehicule.service';
import {ChauffeurService} from '../../services/chauffeur.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Affectation} from '../../modeles/Affectation';
import {FormsModule} from '@angular/forms';
import {Chauffeur} from '../../modeles/Chauffeur';
import {Vehicule} from '../../modeles/Vehicule';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-modifier-affectation',
  imports: [
    FormsModule,
    NgForOf,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    DatePipe
  ],
  templateUrl: './modifier-affectation.component.html',
  styleUrl: './modifier-affectation.component.css'
})
export class ModifierAffectationComponent implements OnInit {

  chauffeurs: Chauffeur[] = [];
  vehicules: Vehicule[] = [];

  selectedVehicule: Vehicule | null = null;
  selectedChauffeur: Chauffeur | null = null;

  constructor(
    private service: AffectationService,
    private vehiculeService: VehiculeService,
    private chauffeurService: ChauffeurService,
    protected dialogRef: MatDialogRef<ModifierAffectationComponent>,
    @Inject(MAT_DIALOG_DATA) public affectation: Affectation
  ) {}

  ngOnInit(): void {
    console.log(this.affectation.date);
    this.chauffeurService.listeChauffeur().subscribe({
      next: (data) => {
        this.chauffeurs = data.chauffeur || [];
        this.selectedChauffeur = this.chauffeurs.find(c => c.id === this.affectation.chauffeur?.id) || null;
      },
      error: (error) => {
        console.error();
      }
    });

    this.vehiculeService.listeVehicule().subscribe({
      next: (data) => {
        this.vehicules = data.vehicule || [];
        this.selectedVehicule = this.vehicules.find(v => v.id === this.affectation.vehicule?.id) || null;
      }
    });
  }

  modifierAffectation(): void {
    if (!this.affectation.id) {
      console.error('ID d\'affectation manquant');
      return;
    }

    if (!this.selectedChauffeur || !this.selectedVehicule || !this.affectation.date) {
      console.error('Chauffeur, Véhicule ou Date manquants');
      return;
    }

    const body = {
      id: this.affectation.id,
      chauffeur: this.selectedChauffeur?.id || null,
      vehicule: this.selectedVehicule?.id || null,
      date: this.affectation.date
    };

    this.service.patch(body).subscribe({
      next: () => {
        this.dialogRef.close("resultat");
      },
      error: (error) => {
        console.error('Erreur lors de la modification de l\'affectation :', error);
      }
    });
  }


  annuler(): void {
    this.dialogRef.close();
  }
}
