import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {VehiculeComponent} from './pages/vehicule/vehicule.component';
import {ChauffeurComponent} from './pages/chauffeur/chauffeur.component';
import {AffectationComponent} from './pages/affectation/affectation.component';
import {ListeAffectationsComponent} from './component/liste-affectations/liste-affectations.component';
import {AffectationFormulaireComponent} from './component/affectation-formulaire/affectation-formulaire.component';
import {AjouterChauffeurComponent} from './component/ajouter-chauffeur/ajouter-chauffeur.component';
import {PresenceChauffeurComponent} from './component/presence-chauffeur/presence-chauffeur.component';
import {SortieComponent} from './pages/sortie/sortie.component';
import {AjouterVehiculeComponent} from './component/ajouter-vehicule/ajouter-vehicule.component';
import {PresenceVehiculeComponent} from './component/presence-vehicule/presence-vehicule.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicule', component: VehiculeComponent ,
    children: [
      {path: 'ajouter',component: AjouterVehiculeComponent},
      {path: 'liste',component: PresenceVehiculeComponent},
      {path: '',redirectTo:'liste',pathMatch: 'full'},
    ]
  },
  { path: 'sortie', component: SortieComponent },
  { path: 'affectation', component: AffectationComponent ,
    children:[
      { path: 'formulaire', component: AffectationFormulaireComponent },
      { path: 'liste', component: ListeAffectationsComponent },
      { path: '',   redirectTo: 'liste', pathMatch: 'full' },
    ]
  },
  { path: 'chauffeur', component: ChauffeurComponent,
    children: [
      { path: 'ajouter', component: AjouterChauffeurComponent },
      { path: 'liste', component: PresenceChauffeurComponent },
      { path: '', redirectTo: 'liste', pathMatch: 'full' },
    ]
  },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
];
