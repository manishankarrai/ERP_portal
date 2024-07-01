import { Component } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { Res } from '../../models/response.model';
import { CommonService } from '../../services/common.service';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';


@Component({
      selector: 'app-supplier',
      standalone: true,
      imports: [ReactiveFormsModule, FormsModule],
      templateUrl: './supplier.component.html',
      styleUrl: './supplier.component.scss'
})
export class SupplierComponent {

      messageBox: string;
      supplier: any;
      currentMenu = 'table';
      addPage: boolean = true;
      editPage: boolean = true;
      //tablePage: boolean = true;
      supplierForm: FormGroup = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            contact_info: new FormControl('', [Validators.required, Validators.minLength(3)]),

      });
      editSupplierForm: FormGroup = new FormGroup({
            id: new FormControl('', Validators.required),
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            contact_info: new FormControl('', [Validators.required, Validators.minLength(3)]),
      });

      constructor(private supplier_: SupplierService, private userInfo_: CommonService) {

            this.userInfo_.updatePageInfo('Supplier', 'dashboard > supplier');
            console.log("req send for employee")
            this.supplier_.getSupplier().subscribe((res: Res) => {
                  this.supplier = res.data;

            });

      }
      addSupplierPage() {
            this.addPage = true;
      }

      menu(name: string) {
            this.messageBox = '';
            this.currentMenu = name;
      }
      editMenu(id) {
            this.messageBox = '';
            this.currentMenu = 'edit';
            this.supplier_.getByIdSupplier({ id }).subscribe((res: Res) => {
                  if (res.error > 0) {
                        this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

                  } else {
                        const supplier = res.data;
                        this.editSupplierForm.setValue({
                              name: supplier.name,
                              contact_info: supplier.contact_info,
                              id: supplier._id,
                        });
                        console.log("user is ", supplier);
                  }
            });
      }
      storeSupplier() {
            this.supplier_.storeSupplier(this.supplierForm.value).subscribe((res: any) => {
                  if (res.error > 0) {
                        this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

                  } else {
                        this.supplier.unshift(res.data);
                        this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Supplier Added  </p>';
                        this.supplierForm.reset();
                  }
            });
      }
      updateSupplier() {
            this.supplier_.updateSupplier(this.editSupplierForm.value).subscribe((res: any) => {
                  this.supplier = res.data;
                  this.currentMenu = 'table';
                  this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Supplier Updated  </p>';

            });
      }
      deleteSupplier(id) {
            this.messageBox = '';
            this.supplier_.deleteSupplier({ id }).subscribe((res: Res) => {
                  if (res.error > 0) {
                        this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

                  } else {
                        this.supplier = res.data;
                        this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Supplier Deleted  </p>';

                  }
            });
      }
}
