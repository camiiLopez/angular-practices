import { Routes } from '@angular/router';
import { GifHistoryComponent } from './gifs/pages/gifs/gif-history/gif-history.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component'),

    children: [
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page.component'),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page.component'),
      },
      {
        path: 'history/:key',
        loadComponent: () =>
          import('./gifs/pages/gifs/gif-history/gif-history.component')
          .then(m => GifHistoryComponent)
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
