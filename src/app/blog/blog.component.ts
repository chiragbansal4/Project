import {Component, OnInit} from '@angular/core';
import {Post} from '../BlogStructure/post';
import {PostService} from '../BlogStructure/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Users} from '../UserStructure/UserStructure';
import {UserLoginService} from '../UserStructure/user-login.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [PostService, UserLoginService]
})
export class BlogComponent implements OnInit {
  idUser;
  url;
  min1 = 0;
  max1 = 4;
  flag = false;
  flagOne = false;
  idBlog;
  idBlogNotFavourite;
  posts: Post[] = [];
  user: Users = new Users();

  constructor(private postService: PostService,
              private userService: UserLoginService, private route: Router, private activate: ActivatedRoute) {
  }

  ngOnInit() {
    this.url = this.route.url;
    console.log(this.url);
    this.idUser = +this.activate.snapshot.paramMap.get('id');
    console.log(this.idUser);
    this.getAllBlog();
  }

  getAllBlog() {
    this.userService.getUser(this.idUser).subscribe(response => {
      this.user = response;
      console.log(response);
    });

    this.postService.getPosts().subscribe(res => {
      this.posts = res as Post[];
      console.log(res);
      console.log(this.posts);
    }, err => {
      console.log(err);
    });
  }

  nextBlogElements() {
    this.min1 += 4;
    this.max1 += 4;
  }

  previousBlogElements() {
    this.min1 -= 4;
    this.max1 -= 4;
  }

  delete(post: Post) {
    if (post.id) {
      this.postService.deletePost(post).subscribe(res => {
        this.getAllBlog();
      });
    }
  }

  favourite(Blog: Post) {
    console.log('Before : ' + this.user.favourite);
    const numberLength: number = this.user.favourite.length - 1;
    const length: string =  numberLength.toString();
    if ((<HTMLInputElement>document.getElementById('favourite')).innerText === 'MARK AS A FAVOURITE') {
      if (Blog.id) {
        this.idBlog = Blog.id;
        for (const ids in this.user.favourite) {
          if (this.user.favourite[ids] !== this.idBlog) {
            continue;
          } else if (this.user.favourite[ids] === this.idBlog) {
            this.flag = true;
            break;
          } else if (length === ids) {
            break;
          }
        }
        if (this.flag === true) {
          alert('already a favourite');
        } else {
          this.user.favourite.push(this.idBlog);
          console.log('After : ' + this.user.favourite);
          this.userService.userUpdate(this.user).subscribe(res => {
            console.log(res);
          });
          alert('marked as a favourite');
        }
      }
    }
    this.flag = false;
  }

  notFavourite(Blog: Post) {
    this.idBlogNotFavourite = Blog.id;
    const indexRemoved = this.user.favourite.indexOf(this.idBlogNotFavourite);
    const indexString = indexRemoved.toString();
    console.log(indexRemoved);
    for (const idNotFavourite in  this.user.favourite) {
      if (idNotFavourite !== indexString) {
        continue;
      } else if (idNotFavourite === indexString) {
        this.flagOne = true;
        break;
      }
    }
    if (this.flagOne === true) {
      this.user.favourite.splice(indexRemoved, 1);
      console.log(this.user.favourite);
      this.userService.userUpdate(this.user).subscribe(res => {
        console.log(res);
      });
      alert('unmarked as a favourite');
    } else {
      alert('already not a favourite');
    }
    this.flagOne = false;
  }
}

