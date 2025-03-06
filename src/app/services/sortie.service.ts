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

  sortieDate(formatted: string | null) : Observable<any>{
    const url = `http://localhost:8080/sortie/index/date/d?date=${formatted}`;
    return this.http.get<Sortie[]>(url)
  }

  sortieDatePdf(formatted: string | null) :Observable<Blob>{
    const url = `http://localhost:8080/sortie/index/date/pdf/d?date=${formatted}`;
    return this.http.get(url,{responseType:'blob'})
  }
}
