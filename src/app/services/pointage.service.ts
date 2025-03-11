import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private env=environment.apiUrl;
  constructor(private http: HttpClient) {

  }
  pointer(id: number | null | undefined): Observable<any> {
    const url = `${this.env}/pointage/nouveau/${id}`;
    return this.http.post(url, {});
  }

  liste(): Observable<any> {
    const url = `${this.env}/pointage/liste`;
    return this.http.get(url);
  }
}
