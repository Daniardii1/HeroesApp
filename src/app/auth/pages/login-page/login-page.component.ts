import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  hidePassword: boolean = true;

  changeHidePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
