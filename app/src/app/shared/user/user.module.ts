import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AuthorBadgeComponent } from './author-badge/author-badge.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { UpdateUserSettingsComponent } from './update-user-settings/update-user-settings.component';
import { UserAvatarUploaderComponent } from './user-avatar-uploader/user-avatar-uploader.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { CustomerModule } from '../customer/customer.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserLogoutComponent } from './user-logout/user-logout.component';




@NgModule({
  declarations: [
    SigninComponent,
    RegisterComponent,
    AuthorBadgeComponent,
    AdminUserListComponent,
    UpdateUserSettingsComponent,
    UserAvatarUploaderComponent,
    AdminUserEditComponent,
    UserLogoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxUploaderModule,
    CustomerModule,
    NgSelectModule
  ],
  exports: [
    SigninComponent,
    RegisterComponent,
    AuthorBadgeComponent,
    AdminUserListComponent,
    UpdateUserSettingsComponent,
    UserAvatarUploaderComponent,
    UserLogoutComponent
  ]
})
export class UserModule { }
