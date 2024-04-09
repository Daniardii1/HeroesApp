import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor( private httpClient: HttpClient ) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(() => localStorage.setItem('token', "agsbcyeodne.kjdhak.jhdam"))
      );
  }

  checkAuth(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) return of(false);

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(() => of(false))
      );
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }
}
