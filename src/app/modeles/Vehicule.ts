
import {Carburant} from './Carburant';

export class Vehicule {
  carburants?: Carburant[]|null;
  commentaire: string;
  date?: string|null;
  disponible?: boolean|null;
  id?: number|null;
  immatriculation: string;
  modele: string;


  constructor(carburants: Carburant[], commentaire: string, date: string, disponible: boolean, id: number, immatriculation: string, modele: string) {
    this.carburants = carburants;
    this.commentaire = commentaire;
    this.date = date;
    this.disponible = disponible;
    this.id = id;
    this.immatriculation = immatriculation;
    this.modele = modele;
  }
  static fromJson(vehicule: any): Vehicule {
    return new Vehicule(
      vehicule.carburants || [],
      vehicule.commentaire || '',
      vehicule.date || '',
      vehicule.disponible ,
      vehicule.id || 0,
      vehicule.immatriculation || '',
      vehicule.modele || ''
    );
  }
  toJson(): any {
    return {
      carburants: this.carburants,
      commentaire: this.commentaire,
      date: this.date,
      disponible: this.disponible,
      id: this.id,
      immatriculation: this.immatriculation,
      modele: this.modele
    };
  }

}
