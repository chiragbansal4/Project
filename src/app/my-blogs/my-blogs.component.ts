import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Users} from '../UserStructure/UserStructure';
import {UserLoginService} from '../UserStructure/user-login.service';
import {Post} from '../BlogStructure/post';
import {PostService} from '../BlogStructure/post.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css'],
  providers: [PostService, UserLoginService]
})
export class MyBlogsComponent implements OnInit {
  postId;
  author;
  id;
  toggle;
  flag = false;
  user: Users = new Users();
  post: Post[] = [];
  updatePost: Post = new Post();
  constructor(private userService: UserLoginService,
              private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
   this.getMyBlogs();
  }
  getMyBlogs() {
    this.route.params.switchMap((params: Params) => {
      this.id = params['id'];
      return this.userService.getUser(this.id);
    }).subscribe(response => {
      this.user = response as Users;
      this.author = this.user.userName;
      this.postService.getPostsOfUser(this.author).subscribe(res => {
        this.post = res as Post[];
        console.log(this.post);
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err); });
  }
  deleteBlog(userBlog: Post ) {
    this.postService.deletePost(userBlog).subscribe(res => {
      console.log('res' + res);
      this.getMyBlogs();
    });
  }
  onSubmit(posts: Post) {
  if (posts.id && this.toggle === 'UPDATE') {
    this.postService.updatePost(posts).subscribe(res => {
      this.flag = false;
      this.getMyBlogs();

    }); }
  }

  updateCurrentButton(posts: Post) {
    this.postId = posts.id;
    this.toggle = (<HTMLInputElement>document.getElementById('updateButton')).innerText ;
    if ( this.toggle === 'UPDATE') {
    this.flag = true;
    (<HTMLInputElement>document.getElementById('updateButton')).innerText = 'REVERT';
  } else {

    (<HTMLInputElement>document.getElementById('updateButton')).innerText = 'UPDATE';
      this.flag = false;
    }
    this.getMyBlogs();
  }
refreshBlog() {
  window.location.reload();
}
revertChangesOfBlog() {
    this.getMyBlogs();
}
}
