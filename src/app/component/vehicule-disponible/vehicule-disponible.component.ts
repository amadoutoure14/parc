import {Component} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-vehicule-disponible',
  standalone: true,
  providers:[DatePipe],
  imports: [MatTableModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule, NgForOf, NgIf],
  templateUrl: './vehicule-disponible.component.html',
  styleUrls: ['./vehicule-disponible.component.css']
})
export class VehiculeDisponibleComponent {

  date: string = '';
  vehicules: Vehicule[] = [];

  constructor(private service: VehiculeService,private datePipe:DatePipe, private snackBar:MatSnackBar) { }


  rechercherVehiculeDisponibleDate(date: string) {

    if (!date) {
      alert('Veuillez sélectionner une date.');
      return;
    }
    const formatted = this.datePipe.transform(date, 'dd/MM/yyyy');

    this.service.rechercherVehiculeDisponibleDate(formatted).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.vehicules=[]
        }else {
          this.vehicules = data.map((data:Partial<Vehicule>)=>Vehicule.fromJson(data))
          this.snackBar.open(`La liste des véhicules disponibles au ${formatted}`,'Fermer',  { duration: 6000 });
        }
      },
      error:(error)=>{
        this.snackBar.open('Une erreur est survenue '+error,'Fermer')
    }
    })

  }

  imprimerVehiculeDisponibleDate(date: string) {

    if (!date) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    const formatted = this.datePipe.transform(date,'dd/MM/yyyy');
    if (formatted){
      this.service.imprimerVehiculeDisponibleDate(formatted).subscribe({
        next:response => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `La_liste_des_véhicules_disponible_au_${date}.pdf`;
          a.click();

          window.URL.revokeObjectURL(url);

          this.snackBar.open('Le PDF est en téléchargement.', 'Fermer', { duration: 3000 });

        },
        error:err => this.snackBar.open('Erreur de chargement'+err,'Fermer',{duration:3000})
      })
    }

  }

  edit(id: number | null | undefined) {

  }

  delete(id: number | null | undefined) {

  }
}
