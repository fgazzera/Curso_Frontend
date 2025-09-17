import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Login {
  private loggedIn = signal(false);
  public isLoggedIn = computed(() => this.loggedIn());

  constructor(private router: Router) {}

  login() {
    this.loggedIn.set(true);
  }

  logout() {
    this.loggedIn.set(false);
    this.router.navigate(['']);
  }
}
