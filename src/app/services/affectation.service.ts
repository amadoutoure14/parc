import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Affectation} from "../modeles/Affectation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http:HttpClient) { }

  nouvelleAffectation():Observable<Affectation>{
    const url = `http://localhost:8080/affectation/nouvelle`;

    return this.http.post<Affectation>(url,"")
  }

  listeAffectations() : Observable<any>{
    const affectationListe = "http://localhost:8080/affectation/liste";
    return this.http.get<any>(affectationListe)
  }

  dateAffectation(date: string|null) : Observable<Affectation[]> {
    const url = `http://localhost:8080/affectation/index/date/d?date=${date}`;
    return this.http.get<Affectation[]>(url);
  }

  imprimerAffectation(date: string | null): Observable<Blob> {
    const url = `http://localhost:8080/affectation/index/date/pdf/d?date=${date}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
