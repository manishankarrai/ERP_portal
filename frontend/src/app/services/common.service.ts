import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import {  Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    dashboard = new Subject();
    username  = new Subject();
    currentPage =  new Subject();
    pageHeading =  new Subject();


    constructor(private http: HttpClient, private localStorageService: LocalstorageService) {

    }

    updatePageInfo(heading: string , page : string ){
         this.pageHeading.next(heading);
         this.currentPage.next(page);
    }

    setUserInfo(token: string, username: string, role: string) {

        this.localStorageService.setItem('token', token);
        this.localStorageService.setItem('username', username);
        const encodedRole = btoa(role);
        this.localStorageService.setItem('role', encodedRole);
        this.dashboard.next(true);
        this.username.next(username);

    }
    getToken(): string {
        const token: any = this.localStorageService.getItem('token');
        return token;
    }
    getUserName(): any {
        const username = this.localStorageService.getItem('username');
        return username;
    }
    getRole(): string {
        const roleStr = this.localStorageService.getItem('role');
        const role = atob(roleStr);
        return role;
    }
    private getUser(token: string) {
        return this.http.post('http://localhost:3000/get/userdetails', { token });
    }
    logout() {

        this.localStorageService.setItem('token', '');
        this.localStorageService.setItem('username', '');
        this.localStorageService.setItem('role', '');
        this.dashboard.next(false);

    }
    setDashboard(bool : boolean) {
      this.dashboard.next(bool);
      const username  =  this.getUserName();
      this.username.next(username)
    }

}
