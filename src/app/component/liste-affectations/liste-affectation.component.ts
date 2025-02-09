import {Component, } from '@angular/core';
import {Affectation} from '../../modeles/Affectation';


@Component({
  selector: 'app-liste-affectations',
  imports: [
  ],
  templateUrl: './liste-affectation.component.html',
  styleUrl: './liste-affectation.component.css'
})
export class ListeAffectationComponent {
  affectations:Affectation[]=[];

  deleteChauffeur() {

  }

  editChauffeur() {

  }
}
