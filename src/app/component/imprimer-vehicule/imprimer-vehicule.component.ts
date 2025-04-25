import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Vehicule} from '../../modeles/Vehicule';
import {MatIcon} from '@angular/material/icon';
import {VehiculeService} from '../../services/vehicule.service';
import {DatePipe, NgClass, NgOptimizedImage} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatInput} from '@angular/material/input';


@Component({
  selector: 'app-imprimer-vehicule',
  templateUrl: './imprimer-vehicule.component.html',
  providers:[DatePipe],
  imports: [
    FormsModule,
    MatButton,
    MatIcon,
    NgClass,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    MatIconButton,
    MatInput,
    NgOptimizedImage,
  ],
  styleUrls: ['./imprimer-vehicule.component.css']
})
export class ImprimerVehiculeComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  debut: string = '';
  fin: string = '';
  message="";
  displayedColumns: string[]=['numero','immatriculation','modele','commentaire','sortie'];
  dataSource = new MatTableDataSource<Vehicule>();

  constructor(private service: VehiculeService,private snackBar:MatSnackBar) { }


  rechercherVehiculeDateEnregistrement(debut: string, fin: string) {
    if (!debut && !fin) {
      alert('Veuillez sélectionner une intervalle !');
      return;
    }

    this.service.vehiculeDatesEnregistrement(debut,fin).subscribe({
      next: (data) => {
        this.dataSource.data = data.vehicule;
        this.dataSource.paginator=this.paginator;
        this.message = data.message;
        this.snackBar.open(data.message, 'Fermer', {duration: 3000});
      }
    })
  }

  ngOnInit(): void {
    this.service.listeVehicule().subscribe({
      next: (data) => {
        this.dataSource.data = data.vehicule;
      }
    });
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
  }
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modifier(vehicule) {

  }

  supprimer(vehicule) {

  }
}
