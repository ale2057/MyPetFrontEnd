import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Pet } from 'src/app/Interfaces/Pet';
import { PetsService } from 'src/app/Services/pets.service';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { AddPetDialogComponent } from '../add-pet-dialog/add-pet-dialog.component';
@Component({
  selector: 'app-pet-admin',
  templateUrl: './pet-admin.component.html',
  styleUrls: ['./pet-admin.component.css'],
})
export class PetAdminComponent implements AfterViewInit, OnInit, OnDestroy {
  suscription: Subscription = new Subscription();
  pets: Pet[] = [];
  status: string = '';
  displayedColumns: string[] = [
    'Nombre',
    'Raza',
    'Ciudad',
    'Sexo',
    'Adoptado',
    'work',
  ];
  dataSource!: MatTableDataSource<Pet>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private petsService: PetsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    // Assign the data to the data source for the table to render
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getPets();
    this.suscription = this.petsService.refresh$.subscribe(() => {
      this.getPets();
    });
  }

  getPets() {
    this.petsService.getPets().subscribe((data: any) => {
      this.pets = data;
      this.dataSource = new MatTableDataSource(this.pets);
    });
  }

  deletePet(id: number) {
    const dialogRef = this.dialog.open(AcceptDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminacion de registro',
        question: 'Esta seguro de eliminar el registro?',
        cancelButonTitle: 'Cancelar',
        acceptButonAction: 'Eliminar',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.petsService.deleteOnePet(id).subscribe({
          next: () => {
            this._snackBar.open('Se eliminó con éxito', 'Cerrar', {
              duration: 3000,
            });
          },
          error: () => {
            this._snackBar.open(
              'Ocurrio un error durante la eliminación!!!',
              'Cerrar',
              { duration: 3000 }
            );
          },
        });
      } else {
        this._snackBar.open('Operacion cancelada', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  addPetDialog() {
    const dialogRef = this.dialog.open(AddPetDialogComponent, {
      width: '500px',
      data: {
        title: 'Registrar nueva mascota',
        cancelButonTitle: 'Cancelar',
        acceptButonAction: 'Aceptar',
      },
    });
  }

  updatePetDialog(petD: Pet) {
    const dialogRef = this.dialog.open(AddPetDialogComponent, {
      width: '500px',
      data: {
        title: 'Actualizar datos de mascota',
        cancelButonTitle: 'Cancelar',
        acceptButonAction: 'Actualizar',
        petData: petD,
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
