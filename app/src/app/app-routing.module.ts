import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { MainLandpageComponent } from './main-landpage/main-landpage.component';
import { RegisterComponent } from './shared/user/register/register.component';
import { AdminGuard } from './guard/admin.guard';


const routes: Routes = [
  {
    path: 'home',
    component: MainLandpageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'front',
    loadChildren: () => import('./front-office/front-office.module').then(m => m.FrontOfficeModule),
    canLoad:[AuthGuard],
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard]
  },
  {
    path: 'back',
    loadChildren: () => import('./back-office/back-office.module').then(m => m.BackOfficeModule),
    canLoad:[AuthGuard,AdminGuard],
    canActivate:[AuthGuard,AdminGuard],
    canActivateChild:[AuthGuard,AdminGuard]
  }
  , {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
