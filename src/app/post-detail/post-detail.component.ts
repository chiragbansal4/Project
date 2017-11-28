import { Component, OnInit } from '@angular/core';
import {PostService} from '../BlogStructure/post.service';
import {Post} from '../BlogStructure/post';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  idUser;
  post: Post= new Post();
  constructor(private route: ActivatedRoute,
              protected postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      const id = params['id'];
      console.log(id);
      return this.postService.getPost(id);
    }).subscribe(response => {
      this.post = response;
    }, err => {
      console.log(err); });
    this.idUser = +this.route.snapshot.paramMap.get('id');
    console.log(this.idUser);
  }

}
