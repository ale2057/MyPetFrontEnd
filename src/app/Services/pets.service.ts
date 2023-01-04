import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//update data real time
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Pet } from '../Interfaces/Pet';
//environment
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  serv = environment.server;

  private _refres$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refres$;
  }

  getPets(): Observable<any> {
    return this.http.get(`${this.serv}/pet/allPets`);
  }

  getOnePet(id: number): Observable<any> {
    return this.http.get(`${this.serv}/pet/onePet/${id}`);
  }

  deleteOnePet(id: number): Observable<any> {
    return this.http
      .delete(`${this.serv}/pet/deletePet/${id}`)
      .pipe(
        tap(() => {
          this._refres$.next();
        })
      );
  }

  addPet(pet: Pet): Observable<any> {
    return this.http.post(`${this.serv}/pet/addPet`, pet).pipe(
      tap(() => {
        this._refres$.next();
      }),
      catchError(this.handleError<any>('addHero'))
    );
  }

  updatePet(pet: Pet, id: number): Observable<any> {
    return this.http
      .put(`${this.serv}/pet/updatePet/${id}`, pet)
      .pipe(
        tap(() => {
          this._refres$.next();
        }),
        catchError(this.handleError<any>('addHero'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
