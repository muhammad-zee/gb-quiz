import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
// import { PublicLayoutComponent } from './public-layout.component';
// import { HomeComponent } from './pages/home/home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { SharedModule } from '../components/share.module';
@NgModule({
  declarations: [
    // PublicLayoutComponent,
    // HomeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    NzLayoutModule,
    NzPageHeaderModule,
    SharedModule,
  ]
})
export class PublicModule { }