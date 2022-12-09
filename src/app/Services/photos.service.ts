import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//update data real time
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private _refres$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refres$;
  }

  getPhotoPetById(id: number): Observable<any> {
    return this.http.get('https://localhost:7191/api/photos/onePhotos/' + id);
  }

  getPhotosPets(): Observable<any> {
    return this.http.get('https://localhost:7191/api/photos/allPhotos');
  }
}
