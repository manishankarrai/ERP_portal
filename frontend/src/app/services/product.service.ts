import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private token: string = '';
  private headers: {};
  private url: string = 'http://localhost:3000/admin/product';

  constructor(private http: HttpClient, private userinfo: CommonService) {
    this.token = this.userinfo.getToken();
    this.headers = { 'Authorization': `Bearer ${this.token}` };
   // console.log("token is set");
  }


  getProduct() {
    return this.http.get(this.url + '/get', { headers: this.headers })
  }
  getByIdProduct(data: any) {
    return this.http.post(this.url + '/getbyid', data, { headers: this.headers })
  }
  storeProduct(data: any) {
    return this.http.post(this.url + '/store', data, { headers: this.headers })
  }
  updateProduct(data: any) {
    return this.http.post(this.url + '/update', data, { headers: this.headers })
  }
  deleteProduct(data) {
    return this.http.post(this.url + '/delete', data, { headers: this.headers })
  }

}
