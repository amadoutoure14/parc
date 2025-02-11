import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-carburant',
  imports: [
    MatButton,
    MatCardHeader,
    MatIcon,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './carburant.component.html',
  styleUrl: './carburant.component.css'
})
export class CarburantComponent {

}
