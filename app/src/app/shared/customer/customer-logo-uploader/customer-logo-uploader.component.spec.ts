import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLogoUploaderComponent } from './customer-logo-uploader.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('CustomerLogoUploaderComponent', () => {
  let component: CustomerLogoUploaderComponent;
  let fixture: ComponentFixture<CustomerLogoUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLogoUploaderComponent ],
      imports:[MaterialModule,ReactiveFormsModule,RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLogoUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
