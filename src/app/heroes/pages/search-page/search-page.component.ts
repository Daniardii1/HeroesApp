import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})

export class SearchPageComponent implements OnInit{
  public searchInput = new FormControl('');
  public heroes!: Observable<Hero[]>;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroes = this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        return this.heroesService.getSuggestions(value);
      })
    );
  }
}
