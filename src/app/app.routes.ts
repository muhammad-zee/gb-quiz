import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirect root to public
 
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
 {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  // 404 - Wildcard route
  {
    path: '**',
    redirectTo: '/'
  }
];