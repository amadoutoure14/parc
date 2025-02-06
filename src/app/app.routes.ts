import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {VehiculeComponent} from './pages/vehicule/vehicule.component';
import {ChauffeurComponent} from './pages/chauffeur/chauffeur.component';
import {AffectationComponent} from './pages/affectation/affectation.component';
import {ListeAffectationComponent} from './component/liste-affectations/liste-affectation.component';
import {AffectationFormulaireComponent} from './component/affectation-formulaire/affectation-formulaire.component';
import {AjouterChauffeurComponent} from './component/ajouter-chauffeur/ajouter-chauffeur.component';
import {PresenceChauffeurComponent} from './component/presence-chauffeur/presence-chauffeur.component';
import {SortieComponent} from './pages/sortie/sortie.component';
import {AjouterVehiculeComponent} from './component/ajouter-vehicule/ajouter-vehicule.component';
import {PresenceVehiculeComponent} from './component/presence-vehicule/presence-vehicule.component';
import {AjouterSortieComponent} from './component/ajouter-sortie/ajouter-sortie.component';
import {ListeSortieComponent} from './component/liste-sortie/liste-sortie.component';
import {RechercherVehiculeComponent} from './component/rechercher-vehicule/rechercher-vehicule.component';
import {ImprimerVehiculeComponent} from './component/imprimer-vehicule/imprimer-vehicule.component';
import {RechercherChauffeurComponent} from './component/rechercher-chauffeur/rechercher-chauffeur.component';
import {ImprimerChauffeurComponent} from './component/imprimer-chauffeur/imprimer-chauffeur.component';
import {RechercherAffectationComponent} from './component/rechercher-affectation/rechercher-affectation.component';
import {RechercherSortieComponent} from './component/rechercher-sortie/rechercher-sortie.component';
import {ImprimerSortieComponent} from './component/imprimer-sortie/imprimer-sortie.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicule', component: VehiculeComponent ,
    children: [
      {path: 'ajouter',component: AjouterVehiculeComponent},
      {path: 'recherche',component: RechercherVehiculeComponent},
      {path: 'imprimer',component: ImprimerVehiculeComponent},
      {path: 'liste',component: PresenceVehiculeComponent},
      {path: '',redirectTo:'liste',pathMatch: 'full'},
    ]
  },
  { path: 'sortie', component: SortieComponent ,
    children:[
      {path: 'ajouter',component: AjouterSortieComponent},
      {path: 'rechercher',component: RechercherSortieComponent},
      {path: 'imprimer',component: ImprimerSortieComponent},
      {path: 'liste',component: ListeSortieComponent},
      {path: '',redirectTo: 'liste',pathMatch: 'full'},
    ]
  },
  { path: 'affectation', component: AffectationComponent ,
    children:[
      { path: 'formulaire', component: AffectationFormulaireComponent },
      { path: 'rechercher', component: RechercherAffectationComponent },
      { path: 'liste', component: ListeAffectationComponent },
      { path: '',   redirectTo: 'liste', pathMatch: 'full' },
    ]
  },
  { path: 'chauffeur', component: ChauffeurComponent,
    children: [
      { path: 'ajouter', component: AjouterChauffeurComponent },
      { path: 'rechercher', component: RechercherChauffeurComponent },
      { path: 'imprimer', component: ImprimerChauffeurComponent },
      { path: 'liste', component: PresenceChauffeurComponent },
      { path: '', redirectTo: 'liste', pathMatch: 'full' },
    ]
  },
  { path: '',   redirectTo: 'sortie', pathMatch: 'full' },
];
