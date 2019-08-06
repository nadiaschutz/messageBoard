import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'new-message',
  template: `

    <mat-card class="card">

    <mat-card-content>
    <div class="example-container">


  <mat-form-field>
  <textarea matInput placeholder="Message" [(ngModel)]="message.text"></textarea>
</mat-form-field>
</div>
<button mat-raised-button color="primary" (click)="post()">Post</button>
    </mat-card-content>
    </mat-card>

  `
})
export class NewMessageComponent {

  constructor(private webService: WebService, private auth: AuthService) { }

  message = {
    owner: this.auth.name,
    text: ''
  };

  post() {
    this.webService.postMessage(this.message);
  }

}
