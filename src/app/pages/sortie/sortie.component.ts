import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-sortie',
    imports: [
        MatButton,
        MatCardHeader,
        MatIcon,
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './sortie.component.html',
  styleUrl: './sortie.component.css'
})
export class SortieComponent {

}
