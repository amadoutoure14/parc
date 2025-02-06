import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-imprimer-vehicule',
  templateUrl: './imprimer-vehicule.component.html',
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCell,
    MatFormField,
    MatInput,
    MatButton,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    FormsModule
  ],
  styleUrls: ['./imprimer-vehicule.component.css']
})
export class ImprimerVehiculeComponent {
  date: string = '';
  vehicules: any[] = [];
  displayedColumns: string[] = ['numero', 'date', 'immatriculation', 'modele', 'commentaire', 'nbrApprovisionnement', 'quantiteLitre'];

  constructor(private http: HttpClient) {
    // Initialisation avec des données fictives pour le test
    this.vehicules = [
      { numero: 1, date: "01/02/2024", immatriculation: "AA-123-BB", modele: "Toyota", commentaire: "OK", nbrApprovisionnement: 3, quantiteLitre: 50 },
      { numero: 2, date: "02/02/2024", immatriculation: "CC-456-DD", modele: "Peugeot", commentaire: "RAS", nbrApprovisionnement: 2, quantiteLitre: 40 },
      { numero: 3, date: "03/02/2024", immatriculation: "EE-789-FF", modele: "Renault", commentaire: null, nbrApprovisionnement: 1, quantiteLitre: 20 }
    ];
  }

  generatePdf() {
    if (!this.date) {
      alert("Veuillez entrer une date valide.");
      return;
    }

    // Simulation d'un appel HTTP pour récupérer le PDF (sera remplacé par Spring Boot)
    console.log(`Appel à l'API avec la date : ${this.date}`);

    this.http.get(`http://localhost:8080/presence/vehicule/index/pdf/date/d?date=${this.date}`, {
      responseType: 'blob'
    }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, error => {
      console.error();
      alert("Erreur lors de la génération du PDF.");
    });
  }
}
