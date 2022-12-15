import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

//Angular Material
import { SharedModule } from './Shared/shared.module';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

//Services
import { HttpClientModule } from '@angular/common/http';
import { PetDetailComponent } from './Components/pet-detail/pet-detail.component';
import { PetAdminComponent } from './Components/pet-admin/pet-admin.component';
import { AcceptDialogComponent } from './Components/accept-dialog/accept-dialog.component';
import { AddPetDialogComponent } from './Components/add-pet-dialog/add-pet-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PetDetailComponent,
    PetAdminComponent,
    AcceptDialogComponent,
    AddPetDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularSvgIconModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `maleFemale`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/maleFemale.svg'
      )
    );
  }
}
