import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';

@Component({
    selector: 'user',
    template: `

    <mat-card class="card">

    <mat-card-content>
    <div class="example-container">
    <mat-form-field>
    <input matInput placeholder="First Name" [(ngModel)]="model.firstName">
  </mat-form-field>

  <mat-form-field>
  <input matInput placeholder="Last Name" [(ngModel)]="model.lastNamet">
</mat-form-field>
</div>
<button mat-raised-button color="primary" (click)="post()">Save Changes</button>
    </mat-card-content>
    </mat-card>

  `
})
export class UserComponent implements OnInit {

    constructor(private webService: WebService) { }

    model = {
        firstName: '',
        lastName: ''
    };

    ngOnInit() {
        this.webService.getUser().subscribe(res => {
            console.log(res);
            this.model.firstName = res['firstName'];
            this.model.lastName = res['lastName'];

        });
    }

    post() {
        this.webService.saveUser(this.model).subscribe();
    }

}
