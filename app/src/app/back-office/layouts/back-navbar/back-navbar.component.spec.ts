import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNavbarComponent } from './back-navbar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('BackNavbarComponent', () => {
  let component: BackNavbarComponent;
  let fixture: ComponentFixture<BackNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackNavbarComponent ],
      imports:[MaterialModule,ReactiveFormsModule,RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
