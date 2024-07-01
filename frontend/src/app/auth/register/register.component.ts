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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide: boolean = true;
  message: string = '';
  user: User;

  constructor(private auth: AuthService, private userinfo: CommonService, private router: Router) {
    this.user = { name: '', email: '', role: '', token: '' };
    this.userinfo.logout();

  }

  registerForm: FormGroup = new FormGroup({
        'name': new FormControl('', [Validators.required , Validators.minLength(3)]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
        'confirmPassword': new FormControl('', [Validators.required , Validators.minLength(6)])
  });

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  async onSubmit() {
    const value = this.registerForm.value;

    
    if (value.password !== value.confirmPassword) {
      this.message = `<p class="text-danger">  <i class="fa-solid fa-triangle-exclamation px-2"></i> Passwords do not match</p>`;
      return;
    }
    try {
      console.log("work");
      const user :User  =  {
        name : this.registerForm.value.name  , 
        email : this.registerForm.value.email , 
        password : this.registerForm.value.password 
      }

      this.auth.register(user).subscribe(
        (res: Res) => {
          if (res.error !== 0) {
            this.message = `<p class="text-danger">  <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}</p>`;
            return;
          }
          console.log("route navigate");
          this.userinfo.setUserInfo(res.data.token  , res.data.name , res.data.role);
          //this.router.navigate(['admin/dashboard']);
        }
      );

    } catch (err) {
      this.message = `<p class="text-danger">  <i class="fa-solid fa-triangle-exclamation px-2"></i> ${err}</p>`;
    }
  }


}