import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatCardHeader,
    MatButton,
    MatDrawer,
    MatDrawerContainer
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titre = 'Telecel parc auto';
  isDrawerOpened = true;

  toggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened;
  }
}
