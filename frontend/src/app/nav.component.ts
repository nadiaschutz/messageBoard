import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'nav',
  template: `

    <mat-toolbar color="primary">
    <a mat-stroked-button routerLink="/">Message Board</a>

    <a mat-stroked-button routerLink="/messages">Messages</a>
    <span style="flex: 1 1 auto"></span>
    <span *ngIf="!auth.isAuth">
    <a mat-stroked-button routerLink="/register">Register</a>
    <a mat-stroked-button routerLink="/login">Login</a>
    </span>
    <span *ngIf="auth.isAuth">
    <a mat-stroked-button routerLink="/user" >Welcome {{auth.name}}</a>
    </span>
    <span *ngIf="auth.isAuth">
    <a mat-stroked-button (click)="auth.logout()" >Logout</a>
    </span>
    </mat-toolbar>

  `
})
export class NavComponent {
  constructor(private auth: AuthService) { }

}
