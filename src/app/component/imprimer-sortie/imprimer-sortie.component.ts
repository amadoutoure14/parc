import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Sortie} from '../../modeles/Sortie';
import {SortieService} from '../../services/sortie.service';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import jsPDF from 'jspdf';
import {Vehicule} from '../../modeles/Vehicule';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-imprimer-sortie',
  imports: [
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgIf,
    DatePipe,
    MatFormField,
    MatLabel,
    MatFormField,
    MatOption,
    MatFormField,
    MatFormField,
    MatSelect,
    MatFormField
  ],
  providers: [DatePipe],
  templateUrl: './imprimer-sortie.component.html',
  styleUrl: './imprimer-sortie.component.css'
})
export class ImprimerSortieComponent implements OnInit {
  message="";

  constructor(private service:SortieService,private snackBar:MatSnackBar ) {}

  debut!:Date;
  sorties:Sortie[]=[]
  sortiesFiltre:Sortie[]=[]
  fin!: Date;
  sortie!: Sortie;


  ngOnInit(): void {
    this.service.listeSortie().subscribe({
      next: data => {
        this.sorties=data.sortie;
        this.sortiesFiltre=[...this.sorties];
      }
    })
  }
  rechercher(sortie: Sortie, debut: Date, fin: Date) {
    const traiterReponse = (data: any) => {
      if (!data || !data.sortie) {
        this.message = data.message || "Aucune donnée trouvée.";
        return;
      }
      this.sorties = data.sortie && data.sortie.length > 0 ? data.sortie : [];
      this.snackBar.open( data.message,"Fermer",{duration:3000})

    };
    if (sortie && debut && fin) {
      this.service.sortiePeriod(sortie.id, debut, fin).subscribe({
        next: (data )=> {
          if (!data || !data.sortie) {
            this.message = data.message || "Aucune donnée trouvée.";
            return;
          }
          this.message = data.message;

        },
      });
    }
    else if (debut && fin) {
      this.service.sortieDates(debut, fin).subscribe({
        next: traiterReponse
      });
    }
    else if (sortie) {
      this.service.idSortie(sortie.id).subscribe({
        next: traiterReponse
      });
    }
    else {
      this.message = "Veuillez sélectionner un véhicule.";
    }
  }

  imprimer(sortie: Sortie, debut: Date, fin: Date)  {
    const impression = (data: any) => {
      if (!data || !data.pointage) {
        this.message = data.message || "Aucune donnée trouvée.";
        return;
      }

      if (data.pointage.length > 0) {
        const doc = new jsPDF();
        const logoPath = 'assets/logo.png';
        const img = new Image();
        img.src = logoPath;

        img.onload = function () {
          doc.addImage(img, 'PNG', 10, 10, 30, 30);
          doc.setFont('Cambria', 'bold');
          doc.setFontSize(14);

          const pdfWidth = doc.internal.pageSize.width;
          const textWidth = doc.getTextWidth(data.message.toUpperCase());
          const textX = (pdfWidth - textWidth) / 2;
          doc.text(data.message.toUpperCase(), textX + 12, 25);

          data.sortie.sort((a: { date: string | number | Date }, b: { date: string | number | Date }) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const header = ["Numéro", "Véhicule", "Modèle", "Carburant", "Date"];

          const sortie = data.sortie.map(
            (p: { id: number; vehicule: Vehicule; date: string; carburant: number }, index: number) => [
              index + 1,
              p.vehicule.immatriculation,
              p.vehicule.modele,
              p.carburant ?? "N/A",
              new Date(p.date).toLocaleDateString('fr-FR')
            ]
          );
          autoTable(doc, {
            startY: 55,
            head: [header],
            body: sortie
          });
          const today = new Date();
          const dateString = `Imprimé le ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} à ${today.getHours()}:${today.getMinutes()}`;
          doc.text(dateString, pdfWidth - 75, doc.internal.pageSize.height - 34);
          doc.save(`Pointage_${today.toISOString().split('T')[0]}.pdf`);
        };

        img.onerror = function () {
          console.error();
        };
      }
    };
    if (sortie && debut && fin) {
      this.service.sortiePeriod(sortie.id, debut, fin).subscribe({
        next: impression
      });
    }
    else if (debut && fin) {
      this.service.sortieDates(debut, fin).subscribe({
        next: impression,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else if (sortie) {
      this.service.idSortie(sortie.id).subscribe({
        next: impression,
        error: () => { this.message = "Erreur lors de la récupération des pointages."; }
      });
    }
    else {
      this.message = "Veuillez sélectionner un véhicule.";
    }
  }
}

