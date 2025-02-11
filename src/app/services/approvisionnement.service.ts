import { Injectable } from '@angular/core';
import {Carburant} from '../modeles/Carburant';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApprovisionnementService {

  constructor(private http: HttpClient) { }

  approvisionner(carburant: Carburant):Observable<Carburant> {
    const url = "http://localhost:8080/approv/nouveau";
    return this.http.post<Carburant>(url,carburant.toJson())
  }

  listeApprov(): Observable<Carburant[]> {
    const url = "http://localhost:8080/approv/liste";
    return this.http.get<Carburant[]>(url)
  }
}
