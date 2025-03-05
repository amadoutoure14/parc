import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-pointage',
  imports: [
    MatButton,
    MatCardHeader,
    MatIcon,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './pointage.component.html',
  styleUrl: './pointage.component.css'
})
export class PointageComponent {

}
