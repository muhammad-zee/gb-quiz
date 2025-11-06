import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
// import { PublicLayoutComponent } from './public-layout.component';
// import { HomeComponent } from './pages/home/home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { SharedModule } from '../components/share.module';
import { PublicJoinComponent } from './public-join/public-join.component';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { PublicRoomComponent } from './public-room/public-room.component';
import { PublicQuizResultComponent } from './public-quiz-result/public-quiz-result.component';



@NgModule({
  declarations: [
    PublicJoinComponent,
    PublicHeaderComponent,
    PublicRoomComponent,
    PublicQuizResultComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
  ]
})
export class PublicModule { }