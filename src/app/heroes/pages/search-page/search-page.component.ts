import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Observable, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})

export class SearchPageComponent implements OnInit{

  public searchInput = new FormControl('');
  public heroes!: Observable<Hero[]>;
  public hasHeroes: boolean = true;
  public selectedHero: Hero | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroes = this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.heroesService.getSuggestions(value)),
      tap(h => this.hasHeroes = h.length > 0)
    );
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}
