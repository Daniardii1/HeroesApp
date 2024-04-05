import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroKeyValues'
})
export class HeroKeyValuesPipe implements PipeTransform {

  transform(hero: Hero): Record<string, string | undefined> {
    const record: Record<string, string | undefined> = {};

    for (const [key, value] of Object.entries(hero)) {

      if (key !== 'publisher' && key !== 'alter_ego' && key !== 'first_appearance' && key !== 'characters') {
        continue;
      }

      record[key] = typeof value === 'string' || typeof value === 'undefined'
        ? value
        : value.toString();
    }
    return record;
  }

}
