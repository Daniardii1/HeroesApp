import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {

    this.authService.login('dani@gmail.com', 'Angular123!')
      .subscribe(() => {
        this.router.navigate(['/'],);
      });
  }

  changeHidePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
