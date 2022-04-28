import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  id: number;
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getProduct(this.id);
    });
  }
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

  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product => {
      this.productForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        price: new FormControl('', [Validators.required]),
        description: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
      });
      this.idControl.setValue(product.id);
      this.nameControl.setValue(product.name);
      this.priceControl.setValue(product.price);
      this.descriptionControl.setValue(product.description);
    });
  }

  updateProduct(id: number) {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.productService.updateProduct(id, product).subscribe(() => {
        this.router.navigate(['/product/list']);
      }, e => {
        console.log(e);
      });
    } else {
      alert('lỗi');
    }
  }
}
