import { Routes } from '@angular/router';
import { FullscreenMapPage } from './pages/fullscreen-map-page/fullscreen-map-page';
import { MarkerPageComponent } from './pages/marker-page/marker-page.component';

export const routes: Routes = [
    {
        path:'fullscreen',
        component: FullscreenMapPage,
        title: 'FullScreen Map'
    },
    {
        path:'markers',
        component: MarkerPageComponent,
        title: 'Marcadores'
    },
    {
        path:'houses',
        component: FullscreenMapPage,
        title: 'Propiedades disponibles'
    },
    {
        path:'**',
        redirectTo: 'fullscreen'
    },
];
