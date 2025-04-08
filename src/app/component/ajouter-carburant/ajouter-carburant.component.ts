import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CarburantService} from '../../services/carburant.service';
import {Vehicule} from '../../modeles/Vehicule';
import {VehiculeService} from '../../services/vehicule.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Carburant} from '../../modeles/Carburant';

@Component({
  selector: 'app-ajouter-carburant',
  imports: [
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    NgForOf,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatOption
  ],
  providers: [DatePipe],
  templateUrl: './ajouter-carburant.component.html',
  styleUrl: './ajouter-carburant.component.css'
})
export class AjouterCarburantComponent implements OnInit {
  vehicules: Vehicule[] = [];
  vehicule: Vehicule | null = null;
  carburant!: Carburant;
  approvisionnementForm!: FormGroup;
  minDate = new Date(2018, 0, 1).toISOString().split('T')[0];
  maxDate = new Date().toISOString().split('T')[0];
  constructor(private snackBar: MatSnackBar, private service: CarburantService, private vehiculeService: VehiculeService,private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.approvisionnementForm = this.fb.group({
      vehicule: [null, Validators.required],
      approv: [null, [Validators.required, Validators.min(1)]],
      date: [null, [Validators.required, this.dateValidator.bind(this)]]
    });

    this.vehiculeService.listeVehicule().subscribe({
      next: (data) => {
        this.vehicules = data.vehicule;
      }
    });
  }

  dateValidator(control: any) {
    const selectedDate = control.value;
    if (selectedDate) {
      if (selectedDate < this.minDate) {
        return { min: true };
      }

      if (selectedDate > this.maxDate) {
        return { max: true };
      }
    }

    return null;
  }

  onSubmit(): void {
    this.carburant=this.approvisionnementForm.value;
      this.service.approvisionner(this.carburant).subscribe({
        next: () => {
          this.approvisionnementForm.reset();
          this.snackBar.open('Véhicule approvisionné !', 'Fermer', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open("Une erreur est survenue !","Fermer",{duration:3000})
        }
      });
    }
}

