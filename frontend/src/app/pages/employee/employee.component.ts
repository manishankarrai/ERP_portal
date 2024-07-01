import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Res } from '../../models/response.model';
import { CommonService } from '../../services/common.service';
import {  FormsModule, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';


@Component({
      selector: 'app-employee',
      standalone: true,
      imports: [FormsModule, ReactiveFormsModule],
      templateUrl: './employee.component.html',
      styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

      messageBox: string;
      allEmployee: [User];
      currentMenu = 'table';
      addPage: boolean = true;
      editPage: boolean = true;
      tablePage: boolean = true;
      userForm: FormGroup = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(5)]),
            role: new FormControl('', [Validators.required])
      });
      editUserForm: FormGroup = new FormGroup({
            id: new FormControl('', Validators.required),
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.minLength(6)]),
            role: new FormControl('', [Validators.required])
      });
      roles: string[] = ['manager', 'admin', 'employee'];

      constructor(private employee_: EmployeeService, private userInfo_: CommonService) {

            this.userInfo_.updatePageInfo('Employee', 'dashboard > employee');
            console.log("req send for employee")
            this.employee_.getEmployee().subscribe((res: Res) => {
                  this.allEmployee = res.data;

            });

      }

      addEmployeePage() {
            this.addPage = true;
      }

      menu(name: string) {
            this.messageBox = '';
            this.currentMenu = name;
      }
      editMenu(id) {
            this.messageBox = '';
            this.currentMenu = 'edit';
            this.employee_.getByIdEmployee({ id }).subscribe((res: Res) => {
                  if (res.error > 0) {
                        this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

                  } else {
                        const user = res.data;
                        this.editUserForm.setValue({
                              name: user.name,
                              email: user.email,
                              role: user.role,
                              id: user._id,
                              password: ''
                        });
                        console.log("user is ", user);
                  }
            });
      }
      storeEmployee() {
            this.employee_.storeEmployee(this.userForm.value).subscribe((res: any) => {
                  if (res.error > 0) {
                        this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

                  } else {
                        this.allEmployee.unshift(res.data);
                        this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Employee Added  </p>';
                        this.userForm.reset();
                  }
            });
      }
      updateEmployee() {
            this.employee_.updateEmployee(this.editUserForm.value).subscribe((res: any) => {
                  this.allEmployee = res.data;
                  this.currentMenu = 'table';
                  this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Employee Updated  </p>';

            });
      }
      deleteEmployee(id) {
            this.messageBox = '';
            this.employee_.deleteEmployee({ id }).subscribe((res: Res) => {
                  if (res.error > 0) {
                        this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

                  } else {
                        this.allEmployee = res.data;
                        this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Employee Deleted  </p>';

                  }
            });
      }


}
