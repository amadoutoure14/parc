import {Component, OnInit} from '@angular/core';
import {PointageService} from '../../services/pointage.service';
import {Pointage} from '../../modeles/Pointage';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-liste-pointage',
  providers: [DatePipe],
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    FormsModule,
    MatInput
  ],
  templateUrl: './liste-pointage.component.html',
  styleUrl: './liste-pointage.component.css'
})
export class ListePointageComponent implements OnInit {

  pointages: Pointage[] = [];
  filtrerPointages: Pointage[] = [];
  message = "";
  filterTerm="";

  constructor(private service: PointageService) {}

  ngOnInit(): void {
    this.service.liste().subscribe({
      next: (data: any) => {
        this.pointages = data.pointage && data.pointage.length > 0 ? data.pointage : [];
        this.filtrerPointages = [...this.pointages];
        this.message = data.message;
      }
    });
  }

  filtrerListe(): void {
    this.filtrerPointages = this.pointages.filter(pointage =>
      pointage.vehicule?.immatriculation?.toLowerCase().includes(this.filterTerm.toLowerCase())
    );
  }

}
