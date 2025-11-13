import { Gif } from "./gif.interface";
import { GiphyItem } from "./giphy.interfaces";

export class GifMapper{
    static mapGiphyItemToGif(giphyItem: GiphyItem) : Gif{
        return {
            id: giphyItem.id,
            title: giphyItem.title,
            url: `https://i.giphy.com/${giphyItem.id}.webp`  
            //giphyItem.images.original.webp
        } as Gif
    }

    static mapGhiphyItemsToGifArray(items: GiphyItem[]) : Gif[]{
        return items.map(this.mapGiphyItemToGif)
    }
}