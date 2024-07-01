import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';

export const routes: Routes = [
    { path: "login" , component: LoginComponent } , 
    { path: "" , redirectTo: '/login' , pathMatch: 'full'  } , 
    { path: "register" , component : RegisterComponent  } , 
    { path: 'admin', loadChildren: () => import('./pages/dashboard.module').then(m => m.DashboardModule) },
    { path: "not-authorized" , component : NotAuthorizedComponent} ,
    { path: "**" , component: PagenotfoundComponent}
];
