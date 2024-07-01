import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Res } from '../../models/response.model';
import { CommonService } from '../../services/common.service';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  messageBox: string;
      product: any;
      currentMenu = 'table';
      addPage: boolean = true;
      editPage: boolean = true;
      productForm: FormGroup = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10)]),
            currency: new FormControl('', [Validators.required]),
            purchage_price: new FormControl('', [Validators.required]),
            selling_price: new FormControl('', [Validators.required]),
      });
      editProductForm: FormGroup = new FormGroup({
            id: new FormControl('', Validators.required),
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10)]),
            currency: new FormControl('', [Validators.required]),
            purchage_price: new FormControl('', [Validators.required]),
            selling_price: new FormControl('', [Validators.required]),
       });

      constructor(private product_: ProductService, private userInfo_: CommonService) {

            this.userInfo_.updatePageInfo('Product', 'dashboard > product');
            console.log("req send for employee")
            this.product_.getProduct().subscribe((res: Res) => {
                  this.product = res.data;

            });

      }
      addProductPage() {
        this.addPage = true;
  }

  menu(name: string) {
        this.messageBox = '';
        this.currentMenu = name;
  }
  editMenu(id) {
        this.messageBox = '';
        this.currentMenu = 'edit';
        this.product_.getByIdProduct({ id }).subscribe((res: Res) => {
              if (res.error > 0) {
                    this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

              } else {
                    const product = res.data;
                    this.editProductForm.setValue({
                          name: product.name,
                          description: product.description,
                          purchage_price: product.purchage_price,
                          currency: product.currency,
                          selling_price: product.selling_price,

                          id: product._id,
                    });
                    console.log("user is ", product);
              }
        });
  }
  storeProduct() {
        this.product_.storeProduct(this.productForm.value).subscribe((res: any) => {
              if (res.error > 0) {
                    this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

              } else {
                    this.product.unshift(res.data);
                    this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Product Added  </p>';
                    this.productForm.reset();
              }
        });
  }
  updateProduct() {
        this.product_.updateProduct(this.editProductForm.value).subscribe((res: any) => {
              this.product = res.data;
              this.currentMenu = 'table';
              this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Product Updated  </p>';

        });
  }
  deleteProduct(id) {
        this.messageBox = '';
        this.product_.deleteProduct({ id }).subscribe((res: Res) => {
              if (res.error > 0) {
                    this.messageBox = `<p class="text-danger"> <i class="fa-solid fa-triangle-exclamation px-2"></i> ${res.message}  </p>`;

              } else {
                    this.product = res.data;
                    this.messageBox = '<p class="text-success "><i class="fa-solid fa-thumbs-up px-2"></i> Product Deleted  </p>';

              }
        });
  }
}
