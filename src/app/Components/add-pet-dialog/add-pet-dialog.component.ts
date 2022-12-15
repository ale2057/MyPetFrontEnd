import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pet } from 'src/app/Interfaces/Pet';
import { PetsService } from 'src/app/Services/pets.service';

export interface DialogData {
  title: string;
  cancelButonTitle: string;
  acceptButonAction: any;
  petData: Pet;
}

@Component({
  selector: 'app-add-pet-dialog',
  templateUrl: './add-pet-dialog.component.html',
  styleUrls: ['./add-pet-dialog.component.css'],
})
export class AddPetDialogComponent {
  genderVl: string = '';
  familyVl: string = '';
  sizeVl: string = '';
  cityVl: string = '';
  addPetForm;
  flag = false;
  opFlag = true;
  constructor(
    public dialogRef: MatDialogRef<AddPetDialogComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private petsService: PetsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.addPetForm = this.formBuilder.group({
      name: this.data.petData?.name || '',
      breed: this.data.petData?.breed || '',
      gender: this.data.petData?.gender || '',
      family: this.data.petData?.family || '',
      size: this.data.petData?.size || '',
      personality: this.data.petData?.personality || '',
      health: this.data.petData?.health || '',
      story: this.data.petData?.story || '',
      city: this.data.petData?.city || '',
      adopted: this.data.petData?.adopted || false,
    });
  }

  onNoClick(): void {
    this._snackBar.open('Operacion cancelada', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data.petData) {
      this.opFlag = false;
    }
  }

  onSubmit(customerData: any) {
    const pet: Pet = customerData;
    if (this.addPetForm.valid) {
      this.petsService.addPet(pet).subscribe((data: any) => {
        if (data) {
          this._snackBar.open('Se añadio con éxito' + data, 'Cerrar', {
            duration: 3000,
          });
        } else {
          this._snackBar.open('Ocurrio un error', 'Cerrar', {
            duration: 3000,
          });
        }
      });
    } else {
      this.flag = true;
    }
    //this.checkoutForm.reset();
    //console.warn('Your order has been submitted', customerData);
  }

  updatePetData(customerData: any) {
    const pet: Pet = customerData;
    if (this.addPetForm.valid) {
      this.petsService
        .updatePet(pet, this.data.petData.petId)
        .subscribe((data: any) => {
          this._snackBar.open('Se actualizó con éxito' + data, 'Cerrar', {
            duration: 3000,
          });
        });
    } else {
      this.flag = true;
    }
  }
}
