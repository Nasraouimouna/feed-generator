import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedArticleComponent } from './featured-article/featured-article.component';
import { UserArticleListComponent } from './user-article-list/user-article-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { AdminArticleListComponent } from './admin-article-list/admin-article-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { GalleryModule } from '../gallery/gallery.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    FeaturedArticleComponent, 
    UserArticleListComponent,
    AddArticleComponent, 
    AdminArticleListComponent, UpdateArticleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularEditorModule,
    UserModule,
    GalleryModule,
    NgSelectModule
  ],
  exports:[
    FeaturedArticleComponent, 
    UserArticleListComponent,
    AddArticleComponent, 
    AdminArticleListComponent
  ]
})
export class FeedsModule { }
