import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Car {
  immatricule: string;
  date: string;
}

const cars: Car[] = [
  { immatricule: 'CC2132MD', date: '22/12/2020' },
  { immatricule: 'CC4132MD', date: '22/12/2020' },
  { immatricule: 'AA2342MA', date: '19/12/2020' },
  { immatricule: 'BB2143BZ', date: '19/12/2020' }
];

@Component({
  selector: 'app-rechercher-vehicule',
  standalone: true,
  imports: [MatTableModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './rechercher-vehicule.component.html',
  styleUrls: ['./rechercher-vehicule.component.css']
})
export class RechercherVehiculeComponent {
  value: string = '';
  displayedColumns: string[] = ['immatricule', 'date', 'actions'];
  dataSource = cars;

  get filteredData(): Car[] {
    if (!this.value) return this.dataSource;
    const filterValue = this.value.toLowerCase();
    return this.dataSource.filter(car =>
      car.date.includes(filterValue) || car.immatricule.toLowerCase().includes(filterValue)
    );
  }

  editVehicule(car: Car) {
    console.log('Modifier :', car);
  }

  deleteVehicule(car: Car) {
    console.log('Supprimer :', car);
  }
}
