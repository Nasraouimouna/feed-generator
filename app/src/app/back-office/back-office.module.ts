import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../shared/helpers/jwt.intercepror';
import { ErrorInterceptor } from '../shared/helpers/error.interceptor';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AppModule } from '../app.module';
import { BackLandpageComponent } from './layouts/back-landpage/back-landpage.component';
import { BackNavbarComponent } from './layouts/back-navbar/back-navbar.component';
import { BackFooterComponent } from './layouts/back-footer/back-footer.component';
import { BackHomePageComponent } from './layouts/back-home-page/back-home-page.component';
import { BackCustomerPageComponent } from './layouts/back-customer-page/back-customer-page.component';
import { BackUsersPageComponent } from './layouts/back-users-page/back-users-page.component';
import { BackFeedsPageComponent } from './layouts/back-feeds-page/back-feeds-page.component';
import { BackGalleryPageComponent } from './layouts/back-gallery-page/back-gallery-page.component';
import { UserModule } from '../shared/user/user.module';
import { CustomerModule } from '../shared/customer/customer.module';
import { FeedsModule } from '../shared/feeds/feeds.module';
import { BackSettingsPageComponent } from './layouts/back-settings-page/back-settings-page.component';
import { GalleryModule } from '../shared/gallery/gallery.module';


@NgModule({
  declarations: [
    BackLandpageComponent,
    BackNavbarComponent, 
    BackFooterComponent, 
    BackHomePageComponent, 
    BackCustomerPageComponent, 
    BackUsersPageComponent, 
    BackFeedsPageComponent, 
    BackGalleryPageComponent, 
    BackSettingsPageComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule,
    CustomerModule,
    FeedsModule,
    GalleryModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: 'dialogData' }
  ]
})
export class BackOfficeModule { }
