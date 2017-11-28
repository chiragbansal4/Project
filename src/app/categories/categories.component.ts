import { Component, OnInit } from '@angular/core';
import {Category} from '../CategoriesStructure/category';
import {CategoryService} from '../CategoriesStructure/categories.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {
  url;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService,
  private route: Router) {
  }

  ngOnInit() {
    this.url = this.route.url ;
    console.log(this.url);

    this.categoryService.getCategory().subscribe(res => {
      this.categories = res as Category[];
      console.log(res);
      console.log(this.categories);
    }, err => {
      console.log(err);
    });
  }
}

