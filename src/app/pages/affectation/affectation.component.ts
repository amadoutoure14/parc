import { Component } from '@angular/core';
import {MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-affectation',
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLinkActive,
    MatIcon,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './affectation.component.html',
  styleUrl: './affectation.component.css'
})
export class AffectationComponent {

}
