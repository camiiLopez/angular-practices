import { Component, inject, signal } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar { 
  router = inject(Router);

  routes = routes.map(r => ({
    path: r.path,
    title: `${r.title ?? 'Maps'}`
  })).filter(route => route.path != '**')

  //OBSERVABLE
  // pageTitle$ = this.router.events.pipe(
  //   filter(event => event instanceof NavigationEnd),
  //   map(event => event.url),
  //   map(url => routes.find(route => `/${ route.path}` === url)?.title ?? '')
  // )

  //SIGNAL
  pageTitle = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => event.url),
    map(url => routes.find(route => `/${ route.path}` === url)?.title ?? '')
  ))
}
