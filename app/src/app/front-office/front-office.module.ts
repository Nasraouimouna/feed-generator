import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../shared/helpers/jwt.intercepror';
import { ErrorInterceptor } from '../shared/helpers/error.interceptor';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FrontNavbarComponent } from './layouts/front-navbar/front-navbar.component';
import { FrontHomePageComponent } from './layouts/front-home-page/front-home-page.component';
import { FrontFeedsPageComponent } from './layouts/front-feeds-page/front-feeds-page.component';
import { FrontGalleryPageComponent } from './layouts/front-gallery-page/front-gallery-page.component';
import { FrontUserSettingsPageComponent } from './layouts/front-user-settings-page/front-user-settings-page.component';
import { FrontFooterComponent } from './layouts/front-footer/front-footer.component';
import { FrontLandpageComponent } from './layouts/front-landpage/front-landpage.component';
import { UserModule } from '../shared/user/user.module';
import { CustomerModule } from '../shared/customer/customer.module';
import { FeedsModule } from '../shared/feeds/feeds.module';
import { GalleryModule } from '../shared/gallery/gallery.module';



@NgModule({
  declarations: [
    FrontNavbarComponent, 
    FrontHomePageComponent, 
    FrontFeedsPageComponent, 
    FrontGalleryPageComponent, 
    FrontUserSettingsPageComponent, 
    FrontFooterComponent, 
    FrontLandpageComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    //BrowserAnimationsModule,
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
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: 'dialogData'}
  ]
})
export class FrontOfficeModule { }
