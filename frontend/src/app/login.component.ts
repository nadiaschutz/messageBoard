import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: `
  <mat-card class="card">
  

    <mat-form-field class="example-full-width">
      <input matInput [(ngModel)]="loginData.email" placeholder="Email"
        type="email">
    </mat-form-field>

    <mat-form-field class="example-full-width">
      <input  matInput [(ngModel)]="loginData.password"  placeholder="password"
        type="password">
    </mat-form-field>

    <br>
    <button mat-raised-button color="primary" (click)="login()">Login</button>


</mat-card>

  `
})
export class LoginComponent {
  constructor(private auth: AuthService) { }

  loginData = {
    email: '',
    password: ''
  };

  login() {
    console.log(this.loginData);
    this.auth.login(this.loginData);
  }
}
