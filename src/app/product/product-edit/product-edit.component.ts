import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  id: number;
  categoryList: Category[] = [];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getProduct(this.id);
    });
  }

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

  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product => {
      this.productForm = new FormGroup({
        id: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
        price: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
        category: new FormControl(''),
      });
      this.idControl.setValue(product.id);
      this.nameControl.setValue(product.name);
      this.priceControl.setValue(product.price);
      this.descriptionControl.setValue(product.description);
      this.imageControl.setValue(product.image);
    });
  }

  updateProduct(id: number) {
    if (this.productForm.valid) {
      const product: Product = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        image: this.productForm.value.image,
        category: {
          id: this.productForm.value.category
        }
      };
      this.productService.updateProduct(id, product).subscribe(() => {
        this.router.navigate(['/product/list']);
      }, e => {
        console.log(e);
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
