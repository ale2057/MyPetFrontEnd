import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//update data real time
import { Observable, Subject } from 'rxjs';
//environment
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  serv = environment.server;

  private _refres$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refres$;
  }

  getPhotoPetById(id: number): Observable<any> {
    return this.http.get(`${this.serv}/photos/onePhotos/${id}`);
  }

  getPhotosPets(): Observable<any> {
    return this.http.get(`${this.serv}/photos/allPhotos`);
  }
}
