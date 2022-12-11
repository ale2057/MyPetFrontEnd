import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pet } from 'src/app/Interfaces/Pet';
import { Photo } from 'src/app/Interfaces/Photo';
import { PetsService } from 'src/app/Services/pets.service';
import { PhotosService } from 'src/app/Services/photos.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css'],
})
export class PetDetailComponent implements OnInit {
  petId: number = 0;
  pet!: Pet;
  photo!: Photo;
  constructor(
    private activRoute: ActivatedRoute,
    private petsService: PetsService,
    private photoService: PhotosService
  ) {}

  ngOnInit(): void {
    this.petId = this.activRoute.snapshot.params['petId'];
    this.getPhoto(this.petId);
    this.getPet(this.petId);
  }

  getPet(id: number) {
    this.petsService.getOnePet(id).subscribe(async (data: any) => {
      this.pet = data;
    });
  }

  getPhoto(id: number) {
    this.photoService.getPhotoPetById(id).subscribe(async (data: any) => {
      this.photo = data;
    });
  }
}
