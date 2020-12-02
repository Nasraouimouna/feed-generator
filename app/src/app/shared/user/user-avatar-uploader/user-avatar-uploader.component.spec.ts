import {RouterModule} from '@angular/router/router';
import {ReactiveFormsModule} from '@angular/forms/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvatarUploaderComponent } from './user-avatar-uploader.component';
import { MaterialModule } from '../../material/material.module';

describe('UserAvatarUploaderComponent', () => {
  let component: UserAvatarUploaderComponent;
  let fixture: ComponentFixture<UserAvatarUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAvatarUploaderComponent ],
      imports:[MaterialModule,ReactiveFormsModule,RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAvatarUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
