import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Affectation} from "../modeles/Affectation";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http:HttpClient) { }
  private  env = environment.apiUrl;

  nouvelleAffectation(affectation:Affectation):Observable<any>{
    const url = `${this.env}/affectation/nouvelle`;
    const body={
      chauffeur: {id:affectation.chauffeur?.id},
      vehicule: {id:affectation.vehicule?.id},
      date:affectation.date
    }
    return this.http.post<any>(url,body)
  }

  listeAffectations() : Observable<any>{
    const url = `${this.env}/affectation/liste`;
    return this.http.get<any>(url)
  }



  dateAffectation(debut:Date,fin:Date) : Observable<any> {
    const url = `${this.env}/affectation/dates/d?debut=${debut}&fin=${fin}`;
    return this.http.get<any>(url);
  }

  patch(affectation: any): Observable<any> {
    const url = `${this.env}/affectation/${affectation.id}/maj`;
    return this.http.patch<any>(url, affectation);
  }

  affectationDate(date: Date): Observable<any>  {
    const url = `${this.env}/affectation/date/d?date=${date}`;
    return this.http.get(url);
  }

  supprimer(affectation: Affectation): Observable<any> {
    const url = `${this.env}/affectation/del/${affectation.id}`;
    return this.http.delete(url);
  }
}
