import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
// import { AdminLayoutComponent } from './admin-layout.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { AppHeaderComponent } from '../layout/app-header/app-header.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { NzContentModule } from 'ng-zorro-antd/content';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { SharedModule } from '../components/share.module';

@NgModule({
  declarations: [
    // AdminLayoutComponent,
    // DashboardComponent,
    // AppHeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }