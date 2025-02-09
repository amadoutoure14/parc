import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Affectation} from "../modeles/Affectation";
import {Observable} from "rxjs";
import {Server} from './server';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http:HttpClient) { }

  nouvelleAffectation(affectation:Affectation):Observable<Affectation>{
    const url = `http://localhost:8080/affectation/nouvelle`;
    return this.http.post<Affectation>(affectation.toJson(),url)
  }
}
