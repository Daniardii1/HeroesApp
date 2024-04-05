import { Pipe, PipeTransform } from '@angular/core';
import { Hero, Publisher } from '../interfaces/hero.interface';

@Pipe({
  name: 'propertyFormatter'
})
export class PropertyFormatterPipe implements PipeTransform {

  transform(property: string): string {

    let formattedKey: string = property.replace(/_/g, ' ')
    .toLowerCase();
    formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);

    return formattedKey;
  }

}
