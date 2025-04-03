import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {DatePipe, NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ModifierVehiculeComponent} from '../modifier-vehicule/modifier-vehicule.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-liste-vehicule',
  templateUrl: './liste-vehicule.component.html',
  imports: [
    FormsModule,
    MatInput,
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatSortModule,
    MatButton,
    MatHeaderRowDef,
    DatePipe,
    MatSort
  ],
  providers:[DatePipe],
  styleUrls: ['./liste-vehicule.component.css']
})
export class ListeVehiculeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['numero', 'immatriculation', 'modele', 'commentaire', 'date', 'actions'];
  dataSource = new MatTableDataSource<Vehicule>();
  filterTerm: string = '';
  message: string = '';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private service: VehiculeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.listeVehicule().subscribe({
      next: (data) => {
        if (data?.vehicule?.length > 0) {
          this.dataSource.data = data.vehicule;
          this.message = data.message;
        } else {
          this.dataSource.data = [];
          this.message = data?.message || 'Aucun véhicule trouvé.';
        }
      },
      error: () => {
        this.message = 'Erreur de connexion avec le serveur.';
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; // Associe MatSort à la table pour le tri
    this.dataSource.filterPredicate = (data: Vehicule, filter: string) => {
      return (
        data.immatriculation.toLowerCase().includes(filter) ||
        data.modele.toLowerCase().includes(filter) ||
        data.commentaire.toLowerCase().includes(filter)
      );
    };
  }

  applyFilter(): void {
    this.dataSource.filter = this.filterTerm.trim().toLowerCase(); // Applique le filtre
  }

  modifier(vehicule: Vehicule): void {
    const dialogRef = this.dialog.open(ModifierVehiculeComponent, {
      width: '900px',
      height: 'auto',
      data: { vehicule }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex((v) => v.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data]; // Force la mise à jour des données
          this.dataSource._updateChangeSubscription(); // Force une nouvelle vérification après modification
        }
      }
    });
  }
}
