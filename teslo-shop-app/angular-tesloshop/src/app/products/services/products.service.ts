import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Product,
  ProductsResponse,
} from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;

    if (this.cacheService.isInCache(key)) return of(this.cacheService.getCache<ProductsResponse>(key))

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap(resp => console.log(resp)),
        tap((resp) => this.cacheService.setCache<ProductsResponse>(key, resp))
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    const key = idSlug;

    if(this.cacheService.isInCache(key)) return of(this.cacheService.getCache<Product>(key));

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      tap(res => this.cacheService.setCache<Product>(key, res, 30))
    );
  }
}
