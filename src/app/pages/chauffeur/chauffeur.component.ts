import { Component } from '@angular/core';
import { MatCardHeader} from "@angular/material/card";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chauffeur',
  imports: [
    MatCardHeader,
    MatIcon,
    MatButton,
    FormsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './chauffeur.component.html',
  styleUrl: './chauffeur.component.css'
})
export class ChauffeurComponent {

}
