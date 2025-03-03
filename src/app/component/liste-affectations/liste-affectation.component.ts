import {Component, OnInit,} from '@angular/core';
import {Affectation} from '../../modeles/Affectation';
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {AffectationService} from '../../services/affectation.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Vehicule} from '../../modeles/Vehicule';
import {Carburant} from '../../modeles/Carburant';


@Component({
  selector: 'app-liste-affectations',
    imports: [
        FormsModule,
        MatIcon,
        MatIconButton,
        MatInput,
        NgForOf,
        NgIf
    ],
  templateUrl: './liste-affectation.component.html',
  styleUrl: './liste-affectation.component.css'
})
export class ListeAffectationComponent implements OnInit {
   message="";

  constructor(private service: AffectationService,private snackBar: MatSnackBar) {
  }

  affectations:Affectation[]=[];
  filterTerm='';
  affectationsFiltre:Affectation[]=[];

  ngOnInit(): void {
    this.service.listeAffectations().subscribe({
      next: data => {
        if (data.affectation) {
          this.affectations = data.affectation;
          this.affectationsFiltre = [...this.affectations];
        }
       else {
         this.affectations = [];
         this.affectationsFiltre = [];
        }
        this.message=data.message
      },
      error: error => {
        this.snackBar.open(error, 'Fermer', { duration: 3000 });
      }
    });
  }



  filterAffectations() {
    if (this.filterTerm.trim()) {
      // this.affectationsFiltre = this.affectations.filter(affectation => {
      //   return affectation.vehicule.immatriculation.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
      //     affectation.chauffeur.nom_complet.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
      //     affectation.chauffeur.telephone.toLowerCase().includes(this.filterTerm.toLowerCase());
      // });
    } else {
      this.affectationsFiltre = [...this.affectations];
    }
  }


  modifier(id: number | null | undefined) {

  }

  delete(id: number | undefined) {

  }

  totalCarburant(carburants: Carburant[] | null | undefined):number {
    return (carburants??[]).reduce((total, carburant) =>total+carburant.approv,0);
  }
}


/*
      <td>{{ i + 1 }}</td>
      <td>{{ affectation.chauffeur.nom_complet }}</td>
      <td>{{ affectation.chauffeur.telephone }}</td>
      <td>{{ affectation.vehicule.immatriculation }}</td>
      <td>{{ totalCarburant(affectation.vehicule.carburants)}}</td>
* */
