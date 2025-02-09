import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vehicule} from '../modeles/Vehicule';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  constructor(private http:HttpClient) { }

  enregistrerVehicule(vehicule: Vehicule): Observable<Vehicule> {
    const url = `http://localhost:8080/vehicule/nouveau`;
    return this.http.post<Vehicule>(url, vehicule);
  }

  listeVehicule(): Observable<Vehicule[]>{
    const url = `http://localhost:8080/vehicule/liste`;
    return this.http.get<Vehicule[]>(url)
  }

  rechercherVehiculeDateEnregistrement(formatted: string | null) {
   const url= `http://localhost:8080/vehicule/index/date/enregistrement/liste/d?date=${formatted}`;
   return this.http.get<Vehicule[]>(url);
  }

  imprimerVehiculeDateEnregistrement(formatted: string) : Observable<Blob>{
    const url = `http://localhost:8080/vehicule/index/date/enregistrement/d?date=${formatted}`;
    return this.http.get(url, { responseType: 'blob' })
  }


  rechercherVehiculeDisponibleDate(formatted: string | null):Observable<Vehicule[]> {
    const url = `http://localhost:8080/vehicule/index/date/disponible/d?date=${formatted}`;
    return this.http.get<Vehicule[]>(url);
  }

  imprimerVehiculeDisponibleDate(formatted: string):Observable<Blob>{
    const url = `http://localhost:8080/vehicule/index/date/disponible/pdf/d?date=${formatted}`;
    return this.http.get(url, { responseType:'blob'});
  }
}
