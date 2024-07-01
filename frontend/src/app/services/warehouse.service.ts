import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private token: string  =  '';
  private headers : {} ;
  private url : string =  'http://localhost:3000/admin/warehouse';
  
  constructor(private http:HttpClient , private userinfo: CommonService) { 
              this.token =  this.userinfo.getToken();
              this.headers  =  { 'Authorization': `Bearer ${this.token}` };
              console.log("token is set" );
  }


  getWarehouse()  {
    return this.http.get(this.url+'/get' , { headers:  this.headers })
  }
  getByIdWarehouse(data : any) {
    return this.http.post( this.url+'/getbyid' , data , { headers:  this.headers })
  }
  storeWarehouse(data : any) {
    return this.http.post(this.url+'/store' , data  , { headers:  this.headers })
  }
  updateWarehouse(data : any) {
    return this.http.post(this.url+'/update', data  , { headers:  this.headers })
  }
  deleteWarehouse(data) {
    return this.http.post(this.url+'/delete' , data  , { headers:  this.headers })
  }
}