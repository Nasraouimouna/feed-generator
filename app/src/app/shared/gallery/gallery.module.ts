import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureListComponent } from './user-picture-list/user-picture-list.component';
import { PictureUploaderComponent } from './picture-uploader/picture-uploader.component';
import { AdminPictureListComponent } from './admin-picture-list/admin-picture-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GalleryService } from './gallery.service';



@NgModule({
  declarations: [
    UserPictureListComponent, 
    PictureUploaderComponent, 
    AdminPictureListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule

  ],
  entryComponents:[PictureUploaderComponent],
  exports:[ 
    UserPictureListComponent, 
    PictureUploaderComponent, 
    AdminPictureListComponent
  ],
  providers:[GalleryService]
})
export class GalleryModule { }
