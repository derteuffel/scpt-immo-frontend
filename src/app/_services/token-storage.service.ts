import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const ACCOUNT_KEY = 'auth-account';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(account): void {
    window.sessionStorage.removeItem(ACCOUNT_KEY);
    window.sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(ACCOUNT_KEY));
  }
}
