import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { EnvironmentService } from './enviroment.service';
import { LoginCredential } from 'shared/models';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;

  private readonly tokenKey = 'inmateIntakeToken';

  currentUserState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.currentUserState.next(this.isAuthenticated());
  }

  login(loginCredential: LoginCredential) {
    return this.http.post<any>(`${this.environmentService.apiUrl}/auth`, {
        username: loginCredential.username,
        password: loginCredential.password,
      }).pipe(
        tap((result: any) => {
          this.setToken(Object.assign({}, result));
        })
      );
  }

  private setToken(result) {
    if (!result || !result.token) {
      return;
    }
    // add key to storage - limited to one tab rathar than local storage.
    sessionStorage.setItem(this.tokenKey, JSON.stringify({ token: result.token }));
  }

  logout() {
    // delete key from session storage
    sessionStorage.removeItem(this.tokenKey);
    this.token = null;
    this.currentUserState.next(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  get currentToken(): string {
    if (!this.token && this.isAuthenticated()) {
      this.token = JSON.parse(sessionStorage.getItem(this.tokenKey)).token;
    }

    return this.token;
  }
}
