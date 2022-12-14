import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Pet } from 'src/app/Interfaces/Pet';
import { Photo } from 'src/app/Interfaces/Photo';
import { PetsService } from 'src/app/Services/pets.service';
import { PhotosService } from 'src/app/Services/photos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pages: number = 1;

  filterFormG = new FormGroup({
    city: new FormControl(''),
    type: new FormControl(''),
    size: new FormControl(''),
    gender: new FormControl(''),
  });
  suscription: Subscription = new Subscription();

  photos: Photo[] = [];
  pets: Pet[] = [];
  auxPets: Pet[] = [];

  constructor(
    private petsService: PetsService,
    private photosService: PhotosService
  ) {}

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getPets();
    this.getPhotos();
    this.suscription = this.petsService.refresh$.subscribe(() => {
      this.getPets();
    });
  }

  getPhotos() {
    this.photosService.getPhotosPets().subscribe((data: any) => {
      this.photos = data;
    });
  }

  getPets() {
    this.petsService.getPets().subscribe((data: any) => {
      this.auxPets = data;
      this.pets = this.auxPets;
    });
  }

  filter() {
    if (this.filterFormG.invalid) return;
    this.pets = this.auxPets;
    this.pets = this.filterByCity(this.pets);
  }

  filterByCity(obje: any) {
    if (this.filterFormG.controls.city.value != '') {
      obje = obje.filter((obj: { city: string | null }) => {
        return obj.city === this.filterFormG.controls.city.value;
      });
    }
    return this.filterByType(obje);
  }

  filterByType(obje: any) {
    if (this.filterFormG.controls.type.value != '') {
      obje = obje.filter((obj: { family: string | null }) => {
        return obj.family === this.filterFormG.controls.type.value;
      });
    }
    return this.filterBySize(obje);
  }

  filterBySize(obje: any) {
    if (this.filterFormG.controls.size.value != '') {
      obje = obje.filter((obj: { size: string | null }) => {
        return obj.size === this.filterFormG.controls.size.value;
      });
    }
    return this.filterByGender(obje);
  }

  filterByGender(obje: any) {
    if (this.filterFormG.controls.gender.value != '') {
      obje = obje.filter((obj: { gender: string | null }) => {
        return obj.gender === this.filterFormG.controls.gender.value;
      });
    }
    return obje;
  }

  searchPhoto(photoId: number) {
    let namePh: string = 'imageDefault.jpg';
    this.photos.filter((pht: Photo) => {
      if (pht.petId === photoId) {
        namePh = pht.petPhoto;
      }
    });
    return namePh;
  }
}
