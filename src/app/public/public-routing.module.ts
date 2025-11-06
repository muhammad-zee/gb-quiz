import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { PublicJoinComponent } from './public-join/public-join.component';
import { PublicRoomComponent } from './public-room/public-room.component';
import { PublicQuizResultComponent } from './public-quiz-result/public-quiz-result.component';
// import { PublicLayoutComponent } from './public-layout.component';
// import { HomeComponent } from './pages/home/home.component';

// These routes are from your old public.routes.ts
const routes: Routes = [
  {
    path: '',
    component: PublicJoinComponent,
  },
  { path: 'quiz', component: PublicRoomComponent },
  { path: 'leader-board', component: PublicQuizResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }