import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-modifier-chauffeur',
  imports: [
    FormsModule,
    MatButton,
    MatIcon
  ],
  templateUrl: './modifier-chauffeur.component.html',
  styleUrl: './modifier-chauffeur.component.css'
})
export class ModifierChauffeurComponent {

}
