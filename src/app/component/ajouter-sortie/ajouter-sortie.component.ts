import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Sortie} from '../../modeles/Sortie';
import {Affectation} from '../../modeles/Affectation';
import {NgIf} from '@angular/common';
import {AffectationService} from '../../services/affectation.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-ajouter-sortie',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel
  ],
  templateUrl: './ajouter-sortie.component.html',
  styleUrl: './ajouter-sortie.component.css'
})
export class AjouterSortieComponent implements OnInit {
  sortieForm!: FormGroup;
  affectations: Affectation[]=[];

  constructor(private fb: FormBuilder, private affectationService: AffectationService) {}

  ngOnInit(): void {

    this.affectationService.listeAffectations().subscribe({
      next: data => {
        this.affectations = data;
      }
    });

    this.sortieForm = this.fb.group({
      affectation: ['', Validators.required],
      arrivee: [''],
      depart: [''],
      destination: ['', Validators.required],
      duree: [''],
      id: [''],
      objet: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.sortieForm.valid) {
      const formValue = this.sortieForm.value;

    }
  }
}
