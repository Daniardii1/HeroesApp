import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError( error => of(undefined))
    );
  }

  getSuggestions(query: string | null): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&attr=superhero&_limit=6`);
  }
}
