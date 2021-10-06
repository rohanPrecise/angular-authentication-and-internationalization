import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/auth/login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { BaseComponent } from './views/theme/base/base.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Admin] }
  // },
  // {
  //   path: '',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./views/pages/admin/admin.module').then(
  //       (m) => m.AdminModule
  //     ),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Admin] }
  // },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./views/pages/home/home.module').then(
  //       (m) => m.HomeModule
  //     ),
  //   canActivate: [AuthGuard]
  // },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    pathMatch: 'prefix',
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./views/pages/home/home.module').then(
            (m) => m.HomeModule
          )
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./views/pages/admin/admin.module').then(
            (m) => m.AdminModule
          ),
        data: { roles: [Role.Admin] }
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  
  // otherwise redirect to home
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
