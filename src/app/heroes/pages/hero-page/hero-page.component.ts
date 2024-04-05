import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { delay, switchMap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      // TODO: borrar delay
      // delay(3000),
      switchMap(({id}) => this.heroesService.getHeroById(id)),
    )
    .subscribe( hero => {
      if (!hero) return this.router.navigate(['/heroes/list']);

      this.hero = hero;
      return;
    });
  }

  getHeroKeyValue(hero: Hero): Record<string, string | undefined> {
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

  goBack(): void {
    this.router.navigate(['/heroes/list']);
  }
}
