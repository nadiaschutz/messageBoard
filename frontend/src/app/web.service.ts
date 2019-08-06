import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { tap, mergeMap } from 'rxjs/operators';
import { of, merge } from 'rxjs';



@Injectable()
export class WebService {

    BASE_URL = 'http://localhost:61234/api';
    private messageStore: any = [];
    private messagesSubject = new Subject();

    messages = this.messagesSubject.asObservable();

    constructor(private httpClient: HttpClient, private sb: MatSnackBar, private auth: AuthService) {
        this.getMessages();
    }



    getMessages(user) {

        user = (user) ? '/' + user : '';
        this.httpClient.get(this.BASE_URL + '/messages' + user).subscribe(response => {
            //  this.getResponse(response);
            this.messageStore = response;
            this.messagesSubject.next(this.messageStore);
        },
            error => {
                this.handleError('Unable to get messages');
            });

    }

    async postMessage(message) {
        try {
            console.log(message);
            const response = await this.httpClient.post(this.BASE_URL + '/messages', message, { responseType: 'text' }).toPromise();
            this.messageStore.push(JSON.parse(response));
            this.messagesSubject.next(this.messageStore);
        } catch (error) {
            this.handleError('Unable to post message');
        }

    }

    getUser() {
        return this.httpClient.get(this.BASE_URL + '/users/me', { headers: this.auth.tokenHeaders() });
    }


    saveUser(userData) {
        return this.httpClient.post(this.BASE_URL + '/users/me', userData, { headers: this.auth.tokenHeaders() });
    }

    private handleError(error) {
        console.error(error.message);
        this.sb.open(error, 'close', { duration: 2000 });
    }

}
