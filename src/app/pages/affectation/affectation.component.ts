import { Component } from '@angular/core';
import {MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ListeAffectationComponent} from '../../component/liste-affectations/liste-affectation.component';

@Component({
  selector: 'app-affectation',
  imports: [
    MatCardHeader,
    MatButton,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    MatIcon,
  ],
  templateUrl: './affectation.component.html',
  styleUrl: './affectation.component.css'
})
export class AffectationComponent {

}
