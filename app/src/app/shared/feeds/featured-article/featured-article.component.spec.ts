import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArticleComponent } from './featured-article.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('FeaturedArticleComponent', () => {
  let component: FeaturedArticleComponent;
  let fixture: ComponentFixture<FeaturedArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedArticleComponent ],
      imports:[MaterialModule,ReactiveFormsModule,RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
