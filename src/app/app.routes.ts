import {Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {VehiculeComponent} from './pages/vehicule/vehicule.component';
import {ChauffeurComponent} from './pages/chauffeur/chauffeur.component';
import {AffectationComponent} from './pages/affectation/affectation.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicule', component: VehiculeComponent },
  { path: 'affectation', component: AffectationComponent },
  { path: 'chauffeur', component: ChauffeurComponent },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
];
