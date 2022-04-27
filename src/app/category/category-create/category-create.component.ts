import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
  });
  private category: any;


  constructor(private categoryService: CategoryService, private router: Router) { }
  get nameControl() {
    return this.categoryForm.get('name');
  }

  ngOnInit() {
    this.nameControl.setValue(this.category.name);
  }


  submit() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      this.categoryService.saveCategory(category).subscribe(() => {
        this.categoryForm.reset();
        this.router.navigate(['/category/list']);
      }, e => {
        console.log(e);
      });
    } else {
      alert('lỗi');
    }
  }
}
