import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dashboard2',
  standalone: true,
  imports: [],
  templateUrl: './dashboard2.component.html',
  styleUrl: './dashboard2.component.scss'
})
export class Dashboard2Component  {
     token : string ;

     constructor(private userinfo_ : CommonService){
              console.log("constructor loaded of dashbaord 2");
              this.token  =  this.userinfo_.getToken();
             console.log(this.token);
             this.userinfo_.updatePageInfo('Dashboard' , '');
     }
      
}
