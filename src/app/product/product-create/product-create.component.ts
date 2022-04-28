import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  constructor(private productService: ProductService,
              private router: Router) { }
  get idControl() {
    return this.productForm.get('id');
  }
  get nameControl() {
    return this.productForm.get('name');
  }

  get priceControl() {
    return this.productForm.get('price');
  }

  get descriptionControl() {
    return this.productForm.get('description');
  }
  ngOnInit() {
  }

  submit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.productService.saveProduct(product).subscribe(() => {
        this.productForm.reset();
        this.router.navigate(['/product/list']);
      }, e => {
        console.log(e);
      });
    } else {
      alert('lỗi');
    }
  }
}

