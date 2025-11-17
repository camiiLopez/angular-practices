import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toggleCase'
})

export class ToggleCasePipe implements PipeTransform {
    transform(value: string, capitalize: boolean = true): string {
        if(capitalize){
            return value.toUpperCase();
        }
        return value.toLowerCase();
    }
}