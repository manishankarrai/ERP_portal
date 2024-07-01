import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL    =  'http://localhost:3000/login' ;
  private registerURL =  'http://localhost:3000/register' ;

  constructor(private http: HttpClient) { }
  

  login(email : string  , password : string ): Observable<any> {

    return this.http.post( this.loginURL , {email , password });
        
  }
  register(user : User ): Observable<any> {

    return this.http.post( this.registerURL , user);
        
  }
}
