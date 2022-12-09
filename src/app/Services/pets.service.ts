import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../Interfaces/Pet';
//update data real time
import {Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private _refres$ = new Subject<void>();

  api: string = 'https://localhost:7191/api/pet/allPets';
  data = [];

  constructor(private http:HttpClient) {
    console.log("Servicio http")
  }

  get refresh$(){
    return this._refres$;
  }

  getPets():Observable<any>{
    return this.http.get('https://localhost:7191/api/pet/allPets');
  }
}
