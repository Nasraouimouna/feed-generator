import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackLandpageComponent } from './layouts/back-landpage/back-landpage.component';
import { BackHomePageComponent } from './layouts/back-home-page/back-home-page.component';
import { BackCustomerPageComponent } from './layouts/back-customer-page/back-customer-page.component';
import { BackUsersPageComponent } from './layouts/back-users-page/back-users-page.component';
import { BackFeedsPageComponent } from './layouts/back-feeds-page/back-feeds-page.component';
import { BackGalleryPageComponent } from './layouts/back-gallery-page/back-gallery-page.component';
import { BackSettingsPageComponent } from './layouts/back-settings-page/back-settings-page.component';
import { SigninComponent } from '../shared/user/signin/signin.component';
import { AdminPictureListComponent } from '../shared/gallery/admin-picture-list/admin-picture-list.component';
import { AddCustomerComponent } from '../shared/customer/add-customer/add-customer.component';
import { CustomerListComponent } from '../shared/customer/customer-list/customer-list.component';
import { UpdateCustomerComponent } from '../shared/customer/update-customer/update-customer.component';
import { AdminUserEditComponent } from '../shared/user/admin-user-edit/admin-user-edit.component';
import { UserArticleListComponent } from '../shared/feeds/user-article-list/user-article-list.component';
import { AdminUserListComponent } from '../shared/user/admin-user-list/admin-user-list.component';


const routes: Routes = [
  {
    path: '', component: BackLandpageComponent,
    children: [
      {
        path: 'home',
        component: BackHomePageComponent
      },
      {
        path: 'customer',
        component: BackCustomerPageComponent,
        children: [
          { path: "", component: CustomerListComponent },
          { path: "add", component: AddCustomerComponent },
          { path: "update/:id", component: UpdateCustomerComponent },
          { path: "**", redirectTo: "", pathMatch: "full" }
        ]

      },
      {
        path: 'users',
        component: BackUsersPageComponent,
        children: [
          { path: "", component: AdminUserListComponent },
          { path: "update/:id", component: AdminUserEditComponent },
          { path: "**", redirectTo: "", pathMatch: "full" }
        ]
      },
      {
        path: 'feeds',
        component: BackFeedsPageComponent
      },
      {
        path: 'gallery',
        component: BackGalleryPageComponent
      },
      {
        path: 'settings',
        component: BackSettingsPageComponent
      },
      {
        path: 'login', component: SigninComponent
      },
      /** {
        path: 'register',
        component: UserSignupComponent
      },
      */
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
