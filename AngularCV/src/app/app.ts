import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Login } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Angular');
  login = inject(Login);


  doLogin() {
    if (this.login.isLoggedIn()) {
      this.login.logout();
    } else {
      this.login.login();
    }
  }
}
