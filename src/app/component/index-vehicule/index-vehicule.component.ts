import { Component } from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Vehicule} from '../../modeles/Vehicule';
import {MatIcon} from '@angular/material/icon';
import {VehiculeService} from '../../services/vehicule.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Carburant} from '../../modeles/Carburant';
import {MatInput} from '@angular/material/input';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-imprimer-vehicule',
  templateUrl: './index-vehicule.component.html',
  providers:[DatePipe],
  imports: [
    FormsModule,
    MatButton,
    MatIcon,
    NgClass,
    MatTable,
    MatSort,
    MatColumnDef,
    MatSortHeader,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
  ],
  styleUrls: ['./index-vehicule.component.css']
})
export class IndexVehiculeComponent {

  debut: string = '';
  fin: string = '';
  message="";
  displayedColumns: string[]=['numero','immatriculation',];
  dataSource= new MatTableDataSource<Vehicule>;

  constructor(private service: VehiculeService,private snackBar:MatSnackBar) { }


  rechercherVehiculeDateEnregistrement(debut: string, fin: string) {
    if (!debut && !fin) {
      alert('Veuillez sélectionner une intervalle !');
      return;
    }

    this.service.vehiculeDatesEnregistrement(debut,fin).subscribe({
      next: (data) => {
        this.dataSource.data = data.vehicule;
        this.message = data.message;
        this.snackBar.open(data.message, 'Fermer', {duration: 3000});
      }
    })
  }

  getTotalCarburant(carburants: Carburant[] | null | undefined): number {
    return (carburants ?? []).reduce((total, carburant) => total + carburant.approv, 0);
  }
}
