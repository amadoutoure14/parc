import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatCardContent,
    MatButton, MatIconModule,
    MatIcon, MatCardHeader
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titre = 'Telecel parc auto';
}
