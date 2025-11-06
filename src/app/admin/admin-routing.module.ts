import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth-guard.service';
// import { AdminLayoutComponent } from './admin-layout.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';


// These routes are from your old admin.routes.ts
const routes: Routes = [
  {
    path: '',
    // component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        // component: DashboardComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }