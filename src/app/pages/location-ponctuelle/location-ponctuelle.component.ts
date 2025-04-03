import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-location-ponctuelle',
  imports: [
    MatButton,
    MatCardHeader,
    MatIcon,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './location-ponctuelle.component.html',
  styleUrl: './location-ponctuelle.component.css'
})
export class LocationPonctuelleComponent {
}
