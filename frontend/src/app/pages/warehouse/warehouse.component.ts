import { Component } from '@angular/core';
import { WarehouseService } from '../../services/warehouse.service';
import { Res } from '../../models/response.model';
import { CommonService } from '../../services/common.service';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss'
})
export class WarehouseComponent {

  messageBox: string;
  warehouse: any;
  currentMenu = 'table';
  addPage: boolean = true;
  editPage: boolean = true;
  warehouseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    location: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  editWarehouseForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    location: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private warehouse_: WarehouseService, private userInfo_: CommonService) {

    this.userInfo_.updatePageInfo('Warehouse', 'dashboard > warehouse');
    console.log("req send for employee")
    this.warehouse_.getWarehouse().subscribe((res: Res) => {
      this.warehouse = res.data;

    });

  }
  addWarehousePage() {
    this.addPage = true;
  }

  menu(name: string) {
    this.messageBox = '';
    this.currentMenu = name;
  }
  editMenu(id) {
    this.messageBox = '';
    this.currentMenu = 'edit';
    this.warehouse_.getByIdWarehouse({ id }).subscribe((res: Res) => {
      if (res.error > 0) {
        this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

      } else {
        const warehouse = res.data;
        this.editWarehouseForm.setValue({
          name: warehouse.name,
          location: warehouse.location,
          id: warehouse._id,
        });
        console.log("user is ", warehouse);
      }
    });
  }
  storeWarehouse() {
    this.warehouse_.storeWarehouse(this.warehouseForm.value).subscribe((res: any) => {
      if (res.error > 0) {
        this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

      } else {
        this.warehouse.unshift(res.data);
        this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Warehouse Added  </p>';
        this.warehouseForm.reset();
      }
    });
  }
  updateWarehouse() {
    this.warehouse_.updateWarehouse(this.editWarehouseForm.value).subscribe((res: any) => {
      this.warehouse = res.data;
      this.currentMenu = 'table';
      this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Warehouse Updated  </p>';

    });
  }
  deleteWarehouse(id) {
    this.messageBox = '';
    this.warehouse_.deleteWarehouse({ id }).subscribe((res: Res) => {
      if (res.error > 0) {
        this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

      } else {
        this.warehouse = res.data;
        this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Warehouse Deleted  </p>';

      }
    });
  }
}
