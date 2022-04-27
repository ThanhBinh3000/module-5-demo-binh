import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  id: number;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getCategory(this.id);
    });
  }
  get nameControl() {
    return this.categoryForm.get('name');
  }
  ngOnInit() {
  }

  getCategory(id: number) {
    return this.categoryService.findById(id).subscribe(category => {
      this.categoryForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      });
      this.nameControl.setValue(category.name);
    });
  }

  updateCategory(id: number) {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      this.categoryService.updateCategory(id, category).subscribe(() => {
        this.router.navigate(['/category/list']);
      }, e => {
        console.log(e);
      });
    } else {
      alert('lỗi');
    }
  }
}
