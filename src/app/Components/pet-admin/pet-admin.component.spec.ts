import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetAdminComponent } from './pet-admin.component';

describe('PetAdminComponent', () => {
  let component: PetAdminComponent;
  let fixture: ComponentFixture<PetAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
