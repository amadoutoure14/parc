import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {VehiculeComponent} from './pages/vehicule/vehicule.component';
import {ChauffeurComponent} from './pages/chauffeur/chauffeur.component';
import {AffectationComponent} from './pages/affectation/affectation.component';
import {ListeAffectationComponent} from './component/liste-affectations/liste-affectation.component';
import {AffectationFormulaireComponent} from './component/affectation-formulaire/affectation-formulaire.component';
import {AjouterChauffeurComponent} from './component/ajouter-chauffeur/ajouter-chauffeur.component';
import {ListeChauffeurComponent} from './component/liste-chauffeur/liste-chauffeur.component';
import {SortieComponent} from './pages/sortie/sortie.component';
import {AjouterVehiculeComponent} from './component/ajouter-vehicule/ajouter-vehicule.component';
import {ListeVehiculeComponent} from './component/liste-vehicule/liste-vehicule.component';
import {AjouterSortieComponent} from './component/ajouter-sortie/ajouter-sortie.component';
import {ListeSortieComponent} from './component/liste-sortie/liste-sortie.component';
import {VehiculeDisponibleComponent} from './component/vehicule-disponible/vehicule-disponible.component';
import {ImprimerVehiculeComponent} from './component/imprimer-vehicule/imprimer-vehicule.component';
import {ImprimerChauffeurComponent} from './component/imprimer-chauffeur/imprimer-chauffeur.component';
import {ImprimerAffectationComponent} from './component/imprimer-affectation/imprimer-affectation.component';
import {ImprimerSortieComponent} from './component/imprimer-sortie/imprimer-sortie.component';
import {CarburantComponent} from './pages/carburant/carburant.component';
import {
  AjouterCarburantComponent
} from './component/ajouter-carburant/ajouter-carburant.component';
import {ListeCarburantComponent} from './component/liste-carburant/liste-carburant.component';
import {
  ImprimerCarburantComponent
} from './component/imprimer-carburant/imprimer-carburant.component';
import {ModifierVehiculeComponent} from './component/modifier-vehicule/modifier-vehicule.component';
import {PointageVehiculeComponent} from './pages/pointage-vehicule/pointage-vehicule.component';
import {ImprimerPointageVehiculeComponent} from './component/imprimer-pointage-vehicule/imprimer-pointage-vehicule.component';
import {ListePointageVehiculeComponent} from './component/liste-pointage-vehicule/liste-pointage-vehicule.component';
import {PointageVehiculeFormulaireComponent} from './component/pointage-vehicule-formulaire/pointage-vehicule-formulaire.component';
import {PointageChauffeurComponent} from './pages/pointage-chauffeur/pointage-chauffeur.component';
import {
  PointageChauffeurFormulaireComponent
} from './component/pointage-chauffeur-formulaire/pointage-chauffeur-formulaire.component';
import {
  ImprimerPointageChauffeurComponent
} from './component/imprimer-pointage-chauffeur/imprimer-pointage-chauffeur.component';
import {ListePointageChauffeurComponent} from './component/liste-pointage-chauffeur/liste-pointage-chauffeur.component';
import {LocationPonctuelleComponent} from './pages/location-ponctuelle/location-ponctuelle.component';
import {FicheLocationComponent} from './component/fiche-location/fiche-location.component';
import {ListeLocationComponent} from './component/liste-location/liste-location.component';
import {ImprimerLocationComponent} from './component/imprimer-location/imprimer-location.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicule', component: VehiculeComponent ,
    children: [
      {path: 'ajouter',component: AjouterVehiculeComponent},
      { path: 'modifier', component: ModifierVehiculeComponent },
      {path: 'disponible',component: VehiculeDisponibleComponent},
      {path: 'imprimer',component: ImprimerVehiculeComponent},
      {path: 'liste',component: ListeVehiculeComponent},
      {path: '',redirectTo:'liste',pathMatch: 'full'},
    ]
  },
  { path: 'sortie', component: SortieComponent ,
    children:[
      {path: 'ajouter',component: AjouterSortieComponent},
      {path: 'imprimer',component: ImprimerSortieComponent},
      {path: 'liste',component: ListeSortieComponent},
      {path: '',redirectTo: 'liste',pathMatch: 'full'},
    ]
  },
  { path: 'pointage', component: PointageVehiculeComponent ,
    children:[
      {path: 'pointer',component: PointageVehiculeFormulaireComponent},
      {path: 'imprimer',component: ImprimerPointageVehiculeComponent},
      {path: 'liste',component: ListePointageVehiculeComponent},
      {path: '',redirectTo: 'liste',pathMatch: 'full'},
    ]
  },
  { path: 'pointage-chauffeur', component: PointageChauffeurComponent ,
    children:[
      {path: 'pointer',component: PointageChauffeurFormulaireComponent},
      {path: 'imprimer',component: ImprimerPointageChauffeurComponent},
      {path: 'liste',component: ListePointageChauffeurComponent},
      {path: '',redirectTo: 'liste',pathMatch: 'full'},
    ]
  },
  {path:'carburant',component:CarburantComponent,
  children:[
    {path: 'ajouter',component: AjouterCarburantComponent},
    {path: 'liste',component: ListeCarburantComponent},
    {path: 'imprimer',component: ImprimerCarburantComponent},
    {path: '',redirectTo: 'liste',pathMatch: 'full'},
  ]
  },
  { path: 'affectation', component: AffectationComponent ,
    children:[
      { path: 'formulaire', component: AffectationFormulaireComponent },
      { path: 'imprimer', component: ImprimerAffectationComponent },
      { path: 'liste', component: ListeAffectationComponent },
      { path: '',   redirectTo: 'liste', pathMatch: 'full' },
    ]
  },
  { path: 'chauffeur', component: ChauffeurComponent,
    children: [
      { path: 'ajouter', component: AjouterChauffeurComponent },
      { path: 'imprimer', component: ImprimerChauffeurComponent },
      { path: 'liste', component: ListeChauffeurComponent },
      { path: '', redirectTo: 'liste', pathMatch: 'full' },
    ]
  },
  { path: 'location', component: LocationPonctuelleComponent,
    children: [
      { path: 'fiche', component: FicheLocationComponent },
      { path: 'imprimer', component:  ImprimerLocationComponent},
      { path: 'liste', component: ListeLocationComponent },
      { path: '', redirectTo: 'liste', pathMatch: 'full' },
    ]
  },
  { path: '',   redirectTo: 'vehicule', pathMatch: 'full' },
];
