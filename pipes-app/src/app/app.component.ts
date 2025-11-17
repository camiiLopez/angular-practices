import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { filter, map, switchMap } from 'rxjs';
import { LocaleService } from './services/locale.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, UpperCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  localeService = inject(LocaleService);

  title = 'pipes-app'

  pageTitle = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.firstChild),
      switchMap(route => route!.title)
    ),
    { initialValue: '' }
  );

  constructor() {
    effect(() => {
      console.log('Título actual:', this.pageTitle());
    });
  }
}
