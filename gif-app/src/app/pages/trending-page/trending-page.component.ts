import { AfterViewInit, Component, computed, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';

import { ScrollStateService } from 'src/app/shared/scroll-state.service';
import { GifService } from '../gifs/services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements OnInit, AfterViewInit{
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);
  gifs = computed(() => { return this.gifService.trendingGifs()})

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')
  
  ngOnInit(): void {
    this.gifService.fetchTrendingGifs();
  }

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) return

    scrollDiv.scrollTop = this.scrollStateService.getTrendingScrollState
  }

  onScroll(){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) return

    //distancia entre el 'inicio de la pantalla' hasta donde estoy
    const scrollTop = scrollDiv.scrollTop;
    //punto de vista
    const clientHeight = scrollDiv.clientHeight;
    //altura total del elemento
    const scrollHeight = scrollDiv.scrollHeight;

    //(scrollTop + scrollClient) cercano a scrollHeight => petición para la siguiente pág
    //la idea es que esté cerca, pero no llegue directamente al 
    // final para tener tiempo de hacer la petición
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.setTrendingScrollState = scrollTop;

    if(isAtBottom){
      this.gifService.fetchTrendingGifs();
    }
  }
}
