import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
    name: 'heroTextColor'
})

export class HeroTextColor implements PipeTransform {
    transform(value: Color): any {
        return ColorMap[value];
    }
}