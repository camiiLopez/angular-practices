import { Routes } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { NumbersPageComponent } from './pages/numbers-page/numbers-page.component';
import { UncommonPageComponent } from './pages/uncommon-page/uncommon-page.component';
import { CustomPageComponent } from './pages/custom-page/custom-page.component';

export const routes: Routes = [
    {
        path: 'basic',
        title: 'Pipes básicos',
        loadComponent: () => import('./pages/basic-page/basic-page.component')
        .then(m => BasicPageComponent)
    },
    {
        path: 'numbers',
        title: 'Pipes numericos',
        loadComponent: () => import('./pages/numbers-page/numbers-page.component')
        .then(m => NumbersPageComponent)
    },
    {
        path: 'uncommon',
        title: 'Pipes no tan comunes',
        loadComponent: () => import('./pages/uncommon-page/uncommon-page.component')
        .then(m => UncommonPageComponent)
    },
    {
        path: 'custom',
        title: 'Pipes personalizados',
        loadComponent: () => import('./pages/custom-page/custom-page.component')
        .then(m => CustomPageComponent)
    },
    {
        path: '**',
        redirectTo: 'basic'
    },
];
