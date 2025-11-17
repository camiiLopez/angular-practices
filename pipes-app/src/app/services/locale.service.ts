import { Injectable, signal } from "@angular/core";

export const AVAILABLE_LOCALES = ['es', 'br', 'en'] as const;
export type availableLocal = typeof AVAILABLE_LOCALES[number];

@Injectable({ providedIn: 'root' })
export class LocaleService {
    private currentLocale = signal<availableLocal>('es')

    constructor() {
        const saved = localStorage.getItem('locale');

        if (AVAILABLE_LOCALES.includes(saved as availableLocal)) {
            this.currentLocale.set(saved as availableLocal);
        } else {
            this.currentLocale.set('es');
        }
        
        this.currentLocale.set(
            localStorage.getItem('locale') as availableLocal ?? 'es'
        )
    }

    get getLocale() {
        return this.currentLocale();
    }

    get getAvailableLocales() {
        return AVAILABLE_LOCALES;
    }

    changeLocale(value: availableLocal) {
        localStorage.setItem('locale', value);
        this.currentLocale.set(value);

        window.location.reload();
    }
}