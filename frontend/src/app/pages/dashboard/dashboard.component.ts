import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { CommonService } from '../../services/common.service';
@Component({
     selector: 'app-dashboard',
     standalone: true,
     imports: [ RouterLink, RouterLinkActive, RouterOutlet],
     templateUrl: './dashboard.component.html',
     styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
     dashboard: boolean = true;
     menuOpenCloseIcon: string = 'menu_open';
     currentRoute: string = '';
     private routerSubscription: Subscription;
     protected user  : User ; 
     dashboardBool$  : any  ;
     username$  : any ;
     pageHeading$  : any ;
     currentPage$  : any ;

     constructor(private el: ElementRef, private router: Router , private userinfo: CommonService) {
          console.log("constructor loaded of dashbaord 1");

              this.userinfo.dashboard.subscribe(e => {
                        this.dashboardBool$ = e ; 
               }) ;
               this.userinfo.username.subscribe(e => {
                      this.username$ = e ; 
               });
               this.userinfo.pageHeading.subscribe(e => {
                    this.pageHeading$ = e ; 
               }) ;
               this.userinfo.currentPage.subscribe(e => {
                    this.currentPage$ = e ; 
               }) ;
            const token  =  this.userinfo.getToken();
            
            if(token){
                  this.userinfo.setDashboard(true);
             }  else {
                 this.userinfo.setDashboard(false);
             }
         
     }
     ngOnInit() {
        
     }

     openCloseSidenav(): void {
          if (this.menuOpenCloseIcon == 'arrow_forward') {
               this.menuOpenCloseIcon = 'menu_open';
               const element = this.el.nativeElement.querySelector('.page-sidenv');
               element.style.display = 'block';
               element.style.width = '20%';

          } else {
               this.menuOpenCloseIcon = 'arrow_forward';
               const element = this.el.nativeElement.querySelector('.page-sidenv');
               element.style.width = '0%';
               element.style.display = 'none';

          }
     }

     logout(): void {

          this.userinfo.logout();
          this.router.navigateByUrl('/login');

     }

     ngOnDestroy() {
         
     }
}
