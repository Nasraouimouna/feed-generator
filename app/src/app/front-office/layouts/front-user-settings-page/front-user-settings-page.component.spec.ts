import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontUserSettingsPageComponent } from './front-user-settings-page.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('FrontUserSettingsPageComponent', () => {
  let component: FrontUserSettingsPageComponent;
  let fixture: ComponentFixture<FrontUserSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontUserSettingsPageComponent ],
      imports:[MaterialModule,ReactiveFormsModule,RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontUserSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
