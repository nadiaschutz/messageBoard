import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from './web.service';

@Component({
    selector: 'messages',
    template: `
    <div *ngFor="let message of webService.messages | async">
    <mat-card class="card">
    
    <mat-card-title [routerLink]="['/messages', message.owner]" style="cursor:pointer">{{message.owner}}</mat-card-title>
  
    <mat-card-content>{{message.text}}</mat-card-content>
    </mat-card>

    </div>`
})
export class MessagesComponent implements OnInit {

    constructor(private webService: WebService, private route: ActivatedRoute) { }
    ngOnInit() {
        const name = this.route.snapshot.params.name;
        this.webService.getMessages(name);
        // this.webService.messages.subscribe(messages => {
        //     this.messages = messages;
        // });
        this.webService.getUser().subscribe(data => {
            console.log(data);
        });
    }


}
