import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PublicLayoutComponent } from './public-layout.component';
// import { HomeComponent } from './pages/home/home.component';

// These routes are from your old public.routes.ts
const routes: Routes = [
  {
    path: '',
    // component: PublicLayoutComponent,
    children: [
      {
        path: '',
        // component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }