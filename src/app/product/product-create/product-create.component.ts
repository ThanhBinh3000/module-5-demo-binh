import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('')
  });
  categoryList: Category[] = [];
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) { }
  ngOnInit() {
    this.getCategories();
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
  get imageControl() {
    return this.productForm.get('image');
  }
  submit() {
    if (this.productForm.valid) {
      const product: Product = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        image: this.productForm.value.image,
        category: {
          id: this.productForm.value.category,
        }
      };
      this.productService.saveProduct(product).subscribe(() => {
        this.productForm.reset();
        this.router.navigate(['/product/list']);
      }, error => {
        console.log(error);
      });
    } else {
      alert('lỗi');
    }
  }
  getCategories() {
    this.categoryService.getAll().subscribe((result) => {
      this.categoryList = result;
    });
  }
}

