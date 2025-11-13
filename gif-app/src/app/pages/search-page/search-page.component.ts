import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GifService } from '../gifs/services/gifs.service';
import { GifListComponent } from '../gifs/gif-list/gif-list.component';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifService = inject(GifService);
  gifResults = computed(() => { return this.gifService.searchGifs()})

  search(val: string){
    this.gifService.search(val);
  }
}
