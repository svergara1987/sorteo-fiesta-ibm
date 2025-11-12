import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./setup/setup.component').then(m => m.SetupComponent)
  },
  {
    path: 'sorteo/:participantes/:premios',
    loadComponent: () => import('./draw/draw.component').then(m => m.DrawComponent)
  },
  { path: '**', redirectTo: '' }
];
