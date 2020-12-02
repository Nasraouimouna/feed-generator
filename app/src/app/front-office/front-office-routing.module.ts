import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { FrontHomePageComponent } from './layouts/front-home-page/front-home-page.component';
import { FrontFeedsPageComponent } from './layouts/front-feeds-page/front-feeds-page.component';
import { FrontGalleryPageComponent } from './layouts/front-gallery-page/front-gallery-page.component';
import { FrontUserSettingsPageComponent } from './layouts/front-user-settings-page/front-user-settings-page.component';
import { FrontLandpageComponent } from './layouts/front-landpage/front-landpage.component';
import { SigninComponent } from '../shared/user/signin/signin.component';
import { AdminArticleListComponent } from '../shared/feeds/admin-article-list/admin-article-list.component';
import { UserArticleListComponent } from '../shared/feeds/user-article-list/user-article-list.component';
import { AddArticleComponent } from '../shared/feeds/add-article/add-article.component';
import { UpdateArticleComponent } from '../shared/feeds/update-article/update-article.component';


const routes: Routes = [
  {
    path: '', component: FrontLandpageComponent,
    children: [
      {
        path: 'home',
        component: FrontHomePageComponent
      },
      {
        path: 'feeds',
        component: FrontFeedsPageComponent,
        children: [
          { path: "", component: UserArticleListComponent },
          { path: "add", component: AddArticleComponent },
          { path: "update/:id",component: UpdateArticleComponent},
          { path: "**", redirectTo: "", pathMatch: "full" }
        ]

      },
      {
        path: 'gallery',
        component: FrontGalleryPageComponent,
        //canActivate:[]
      },
      {
        path: 'settings',
        component: FrontUserSettingsPageComponent
      },
      {
        path: 'login', component: SigninComponent
      },


      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ],

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
