import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { Res } from '../../models/response.model';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide: boolean = true;
  message: string = '';
  constructor(private auth: AuthService, private userinfo: CommonService, private router: Router) {
    this.userinfo.logout();

  }

  loginForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

   onSubmit() {
    try {
      const value = this.loginForm.value;
    
      this.auth.login(value.email, value.password).subscribe(
        (res: Res) => {
          if (res.error !== 0) {
            this.message = `<p class="text-danger">  <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}</p>`;
            return;
          }
          console.log("user verified successfully", res.data);
          this.userinfo.setUserInfo(res.data.token  , res.data.name , res.data.role);
          let token_come =  this.userinfo.getToken();
          console.log("token " ,token_come);
          console.log("route navigate");
          //this.router.navigate(['admin/dashboard']);
          this.router.navigateByUrl('/admin/dashboard');
        }
      );

    } catch (err) {
      this.message = `<p class="error-message" >${err} </p>`;
    }
  }
}
