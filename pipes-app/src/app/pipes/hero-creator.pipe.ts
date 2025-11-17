import { Pipe, PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
    name: 'heroCreator'
})

export class HeroCreatorPipe implements PipeTransform {
    transform(value: any): any {
        return Creator[value];
    }
}