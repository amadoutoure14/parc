import { Component } from '@angular/core';
import {MatCardHeader} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

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
