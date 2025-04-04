import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Sortie} from '../modeles/Sortie';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SortieService {
  private  env = environment.apiUrl;

  constructor(private http: HttpClient) { }

  enregistrer(sortie:Sortie):Observable<any> {
    const body= {
      lieu_depart: sortie.lieu_depart,
      destination: sortie.destination,
      date_debut: sortie.date_debut,
      date_fin: sortie.date_fin,
      objet: sortie.objet,
      affectation: sortie.affectation?.id,
    }
    const url = `${this.env}/sortie/nouvelle`;
    return this.http.post<any>(url,body)
  }

  listeSortie() : Observable<any> {
    const url = `${this.env}/sortie/liste`;
    return this.http.get<Sortie[]>(url)
  }

  sortieDates(debut:Date,fin:Date) : Observable<any>{
    const url = `${this.env}/sortie/liste/dates/d?debut=${debut}&fin=${fin}`;
    return this.http.get<any>(url)
  }


  derniereSortie(id:number) : Observable<any>{
    const url =
      `${this.env}/sortie/dernier/${id}`;
    return this.http.get(url);
  }

  patch(id: number | null | undefined, sortie: any):Observable<any> {
    const body = {
      id:sortie.id,
      lieu_depart: sortie.lieu_depart,
      destination:sortie.destination,
      date_debut: sortie.date_debut,
      date_fin: sortie.date_fin,
      objet: sortie.objet,
      affectation: sortie.affectation?.id
    }
    console.log(body)
   const url = `${this.env}/sortie/${id}/maj`
    return this.http.patch(url,body)
  }

  terminer(sortie:Sortie) :Observable<any>{
    const url = `${this.env}/sortie/terminer`;
    const body = {
      id:sortie.id
    }
    return this.http.post(url,body)
  }

  sortiePeriod(id: number | null | undefined, debut: Date, fin: Date):Observable<any> {
    const url = `${this.env}`;
    return this.http.get(url)
  }

  sortieDate(id: number | null | undefined):Observable<any>  {
    const url =`${this.env}`
    return this.http.get(url)
  }

}
