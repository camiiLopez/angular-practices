import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifListComponent } from '../gif-list/gif-list.component';
import { GifService } from '../services/gifs.service';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
  styleUrl: './gif-history.component.css'
})
export class GifHistoryComponent {
  giftService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( params => params['key'])
    )
  )

  giftsByKey = computed((() => {
    return this.giftService.getHistoryGifs(this.query());
  }))
}
