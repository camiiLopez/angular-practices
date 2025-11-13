import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ScrollStateService{
    private trendingScrollState = signal(0);

    get getTrendingScrollState(){
        return this.trendingScrollState();
    }

    set setTrendingScrollState(value: number){
        this.trendingScrollState.set(value);
    }
}