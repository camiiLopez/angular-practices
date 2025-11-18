import { Injectable, signal } from '@angular/core';

export interface CacheObject<T> {
    value: T,
    ttl: number
}

@Injectable({ providedIn: 'root' })
export class CacheService {
    //tiempo de expiracion (segundos) 300 = 5min
    private CACHE_EXPIRATION_TTL = 300
    //cache global
    private cache = signal<Map<string, CacheObject<any>>>(new Map())

    constructor() {
        setInterval(() => {
            const map = this.cache()
            map.forEach((value, key) => {
                value.ttl -= 1
                //console.log('key ' + key + ' tiempo faltante: ' + value.ttl);

                if (value.ttl <= 0) this.delete(key);
            })
        }, 60_000); //caada 1 segundo
    }

    //devuelve si se encuentra o no en cache
    isInCache(key: string) {
        return this.cache().has(key);
    }

    //retorno el valor de lo almacenado en la key
    getCache<T>(key: string) {
        return this.cache().get(key)?.value || null;
    }

    //guardar un elemento en el cache
    setCache<T>(key: string, value: any, ttl: number = this.CACHE_EXPIRATION_TTL) {
        this.cache.update((oldMap) => {
            const updateMap = new Map(oldMap)
            updateMap.set(key, { value, ttl })
            return updateMap;
        })
    }

    //reemplazo el mapa por uno nuevo sin la key a eliminar
    delete(key: string) {
        this.cache.update((oldMap) => {
            const newMap = new Map(oldMap)
            newMap.delete(key)
            return newMap;
        })
    }
}