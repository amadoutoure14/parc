import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Sortie} from '../modeles/Sortie';

@Injectable({
  providedIn: 'root'
})
export class SortieService {

  constructor(private http: HttpClient) { }

  enregistrer(sortie:Sortie):Observable<Sortie> {
    const url = "http://localhost:8080/sortie/nouvelle";
    return this.http.post<Sortie>(url,sortie.toJson())
  }

  listeSortie():Observable<Sortie[]> {
    const url = "http://localhost:8080/sortie/liste";
    return this.http.get<Sortie[]>(url)
  }

  sortieDate(formatted: string | null):Observable<Sortie[]> {
    const url = `http://localhost:8080/sortie/index/date/d?date=${formatted}`;
    return this.http.get<Sortie[]>(url)
  }

  sortieDatePdf(formatted: string | null) :Observable<Blob>{
    const url = `http://localhost:8080/sortie/index/date/pdf/d?date=${formatted}`;
    return this.http.get(url,{responseType:'blob'})
  }
}
