import { Component, OnInit } from '@angular/core';
import {Post} from '../BlogStructure/post';
import {Category} from '../CategoriesStructure/category';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../BlogStructure/post.service';
import {CategoryService} from '../CategoriesStructure/categories.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
  providers: [PostService, CategoryService]
})
export class CategoryDetailsComponent implements OnInit {
  min1 = 0;
  max1 = 3 ;
  post: Post[]= [];
  categoryBlog: Category= new Category();
  constructor(private route: ActivatedRoute,
              protected postService: PostService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      const id = params['id'];
      return this.categoryService.getCategories(id);
    }).subscribe(response => {
      this.categoryBlog = response;
      console.log(this.categoryBlog);
      const category = this.categoryBlog.title;
      this.postService.getPostsByCategory(category).subscribe(res => {
        this.post = res as Post[];
        console.log(this.post);
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err); });
  }
  nextBlogElements() {
    this.min1 += 3;
    this.max1 += 3;
  }
  previousBlogElements() {
    this.min1 -= 3;
    this.max1 -= 3;
  }
}

