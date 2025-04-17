import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vehicule} from '../modeles/Vehicule';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  enregistrerVehicule(vehicule: any): Observable<any> {
    const url = `${this.apiUrl}/vehicule/nouveau`;
    return this.http.post<any>(url, vehicule);
  }

  listeVehicule(): Observable<any>{
    const url=`${this.apiUrl}/vehicule/liste`
    return this.http.get<any>(url);
  }


  vehiculeDatesEnregistrement(debut: string, fin: string): Observable<any> {
   const url= `${this.apiUrl}/vehicule/dates/liste/d?debut=${debut}&fin=${fin}`;
   return this.http.get<any>(url);
  }

  vehicule(id: number) :Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/sortie/index/id/${id}/info`);
  }

  patchVehicule(vehicule: Vehicule):Observable<any> {
    const url = `${this.apiUrl}/vehicule/${vehicule.id}/maj`;
    return this.http.patch<any>(url, vehicule);
  }

  supprimer(vehicule: Vehicule):Observable<any>  {
    const url=`${this.apiUrl}/vehicule/del/${vehicule.id}`
    return this.http.post<any>(url,{});
  }
}
