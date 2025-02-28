import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Carburant} from '../../modeles/Carburant';
import {VehiculeService} from '../../services/vehicule.service';
import {Vehicule} from '../../modeles/Vehicule';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {CarburantService} from '../../services/carburant.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-rechercher-carburant',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf,
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect
  ],
  templateUrl: './imprimer-carburant.component.html',
  styleUrl: './imprimer-carburant.component.css'
})
export class ImprimerCarburantComponent implements OnInit{


  constructor(private serviceVehicule:VehiculeService,private service:CarburantService,private snackBar:MatSnackBar) {
  }
  vehicules: Vehicule[]=[];
  carburantsFiltre: Carburant[]=[];
  vehicule!: Vehicule;

  modifier() {

  }

  ngOnInit(): void {
    this.serviceVehicule.listeVehicule().subscribe({
      next: data => {
        this.vehicules = data.vehicule;
      }
    })
  }

  rechercherCarburantVehicule(vehicule: Vehicule) {
    this.service.carburantVehicule(vehicule).subscribe({
      next: data => {
        this.carburantsFiltre = data.carburant;
        this.snackBar.open(data.message,"Fermer",{duration:3000});
      },
      error: err => {
        this.snackBar.open(err,"Fermer",{duration:3000});
      }
    })
  }

  imprimer(vehicule: Vehicule) {
    // Afficher un snackBar pour informer que le téléchargement est en cours
    const snackBarRef = this.snackBar.open('Téléchargement en cours...', 'Fermer', { duration: 0 });

    this.service.imprimer(vehicule).subscribe({
      next: (data: Blob | string) => {
        // Si la réponse est une chaîne (message d'absence de données)
        if (typeof data === 'string') {
          snackBarRef.dismiss();
          // Afficher un snackBar pour informer qu'aucun carburant n'a été trouvé
          this.snackBar.open(data.toString(), 'Fermer', { duration: 3000 });
        } else {
          // Fermer le snackBar une fois que le téléchargement est prêt
          snackBarRef.dismiss();

          // Créer l'URL de l'objet pour le blob PDF
          const fileURL = URL.createObjectURL(data);

          // Ouvrir le fichier PDF dans une nouvelle fenêtre
          const windowRef = window.open(fileURL, '_blank');
          if (windowRef) {
            windowRef.focus();
          }
        }
      },
      error: (err) => {
        // Fermer le snackBar en cas d'erreur
        snackBarRef.dismiss();

        // Afficher un snackBar d'erreur
        this.snackBar.open('Erreur lors de l\'impression du carburant.', 'Fermer', { duration: 3000 });
      }
    });
  }


}
