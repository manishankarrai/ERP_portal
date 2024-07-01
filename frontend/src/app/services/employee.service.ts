import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private token: string  =  '';
  private headers : {} ;
  private url : string =  'http://localhost:3000/admin/employee';
  
  constructor(private http:HttpClient , private userinfo: CommonService) { 
              this.token =  this.userinfo.getToken();
              this.headers  =  { 'Authorization': `Bearer ${this.token}` };
              console.log("token is set" );
  }


  getEmployee()  {
      return this.http.get(this.url+'/get' , { headers:  this.headers })
  }
  getByIdEmployee(data : any) {
      return this.http.post( this.url+'/getbyid' , data , { headers:  this.headers })
  }
  storeEmployee(data : any) {
      return this.http.post(this.url+'/store' , data  , { headers:  this.headers })
  }
  updateEmployee(data : any) {
      return this.http.post(this.url+'/update', data  , { headers:  this.headers })
  }
  deleteEmployee(data) {
      return this.http.post(this.url+'/delete' , data  , { headers:  this.headers })
  }

}
