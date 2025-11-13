import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";

import { map, tap } from "rxjs";
import { Gif } from "../interfaces/gif.interface";
import { GiphyResponse } from "../interfaces/giphy.interfaces";
import { GifMapper } from "../interfaces/gif.mapper";

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);

    return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {

    http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    searchGifs = signal<Gif[]>([]);
    isLoading = signal(false);
    private trendingPage = signal(0);

    trendingGifGroup = computed<Gif[][]>(() => {
        const groups = [];
        for (let i = 0; i < this.trendingGifs().length; i += 3) {
            groups.push(this.trendingGifs().slice(i, i + 3))
        }
        return groups;
    })

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

    constructor() { }

    saveGifsToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory())
        localStorage.setItem(GIF_KEY, historyString);
    })

    fetchTrendingGifs() {
        //para que no hayan peticiones sin resolver
        if(this.isLoading()) return;

        this.isLoading.set(true);

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,
            {
                params: {
                    api_key: `${environment.giphyApiKey}`,
                    limit: 20,
                    offset: this.trendingPage() * 20
                }
            }
        ).subscribe((res) => {
            const gifs = GifMapper.mapGhiphyItemsToGifArray(res.data);
            this.trendingGifs.update(currentGifs => [
                ...currentGifs,
                ...gifs
            ]);
            console.log(gifs);
            this.trendingPage.update(v => v + 1)
            this.isLoading.set(false);
        })
    }

    search(query: string) {
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: `${environment.giphyApiKey}`,
                limit: 20,
                q: query
            }
        }
        ).pipe(
            map(d => GifMapper.mapGhiphyItemsToGifArray(d.data)),
            tap(items => {
                this.searchHistory.update((history) => ({
                    ...history,
                    [query.toLowerCase()]: items
                }));
            }),
            tap(items => this.searchGifs.set(items)),
            tap(d => {
                console.log(d);
            })
        ).subscribe()
    }

    getHistoryGifs(query: string): Gif[] {
        return this.searchHistory()[query] ?? [];
    }
}