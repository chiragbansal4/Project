import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../BlogStructure/post';
import {PostService} from '../BlogStructure/post.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserLoginService} from '../UserStructure/user-login.service';
import {Users} from '../UserStructure/UserStructure';
import {isNullOrUndefined} from "util";




@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css'],
  providers: [PostService, UserLoginService]
})
export class PostBlogComponent implements OnInit {
  @Input() blog: number ;
  idUser;
  post: Post= new Post();
  user: Users= new Users();
  constructor(private userService: UserLoginService,
              private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.idUser = +this.route.snapshot.paramMap.get('id');
      console.log(this.idUser);
      this.route.params.switchMap((params: Params) => {
        const id = params['id'];
        return this.userService.getUser(id);
      }).subscribe(response => {
        this.user = response as Users;
      }, err => {
        console.log(err); });
    }
  onSubmit() {
    if (isNullOrUndefined(this.post.title) || isNullOrUndefined(this.post.body)) {
      alert('Every field is Mandatory');
    } else if (!this.post.title.trim() || !this.post.body.trim() || !this.post.category || !this.post.postDate) {
      alert('Every field is Mandatory') ;
    } else {
      this.post.authorName = this.user.userName;
      this.postService.createPost(this.post)
        .subscribe(res => {
          console.log(res.id);
          const url = 'userLogin/' + this.idUser + '/allBlog/' + res.id;
          this.router.navigate([url]);
        });
      }}

}

