import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackLandpageComponent } from './back-landpage.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('BackLandpageComponent', () => {
  let component: BackLandpageComponent;
  let fixture: ComponentFixture<BackLandpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackLandpageComponent ],
      imports:[MaterialModule,ReactiveFormsModule,RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackLandpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
