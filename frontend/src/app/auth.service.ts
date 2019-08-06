import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, mergeMap } from 'rxjs/operators';
import { Observable, of, merge } from 'rxjs';


@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:61234/auth';

    NAME_KEY = 'name';
    TOKEN_KEY = 'token';

    constructor(private httpClient: HttpClient, private router: Router) {

    }

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuth() {
        return !!localStorage.getItem(this.TOKEN_KEY);
        // console.log(!!localStorage.getItem(this.TOKEN_KEY));
    }



    tokenHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
        });
        return headers;
    }





    login(loginData) {
        this.httpClient.post(this.BASE_URL + '/login', loginData).subscribe(res => {
            this.authenticate(res);
        });
    }

    register(user) {
        delete user.confirmPassword;
        this.httpClient.post(this.BASE_URL + '/register', user).subscribe(res => {

            this.authenticate(res);
        });
        console.log(user);
    }


    logout() {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }



    authenticate(res) {
        if (!res['token']) {
            return;
        } else {
            console.log(res);
            localStorage.setItem(this.TOKEN_KEY, res['token']);
            localStorage.setItem(this.NAME_KEY, res['firstName']);
            this.router.navigate(['/']);
        }

    }



}