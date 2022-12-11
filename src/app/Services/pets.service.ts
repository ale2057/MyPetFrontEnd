import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//update data real time
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private _refres$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refres$;
  }

  getPets(): Observable<any> {
    return this.http.get('https://localhost:7191/api/pet/allPets');
  }

  getOnePet(id: number): Observable<any> {
    return this.http.get('https://localhost:7191/api/pet/onePet/' + id);
  }
}
