import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Users} from '../UserStructure/UserStructure';
import {UserLoginService} from '../UserStructure/user-login.service';
import {PostService} from '../BlogStructure/post.service';
import {Post} from '../BlogStructure/post';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
  providers: [PostService, UserLoginService]
})
export class FavouriteComponent implements OnInit {
  flagOne = false;
  idBlogNotFavourite;
  user: Users =  new Users();
  postFavourite: Post []= [];
  post: Post []= [];
  idUser;
  userDetail: Users = new Users();
  constructor( private route: ActivatedRoute,
               private userService: UserLoginService
               , private postService: PostService ) { }
  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.idUser = params['id'];
      return this.userService.getUser(this.idUser);
    }).subscribe(response => {
      this.userDetail = response as Users;
      this.postService.getPosts().subscribe(res => {  this.post = res as Post[];
        for ( const idFavourite of this.userDetail.favourite  ){debugger;
          this.postService.getPost(idFavourite).subscribe(resi => {
            console.log('resi');
            this.postFavourite.push(resi as Post);
            console.log(this.postFavourite);
          }, err => {
            console.log(err);
          }); }}
     );
    }, err => {
      console.log(err); });
  }
  notFavourite (Blog: string) {
    this.idBlogNotFavourite = Blog;
    const indexRemoved = this.user.favourite.indexOf(this.idBlogNotFavourite);
    const indexString = indexRemoved.toString();
    console.log(indexRemoved);
    for ( const idNotFavourite in  this.user.favourite) {
      if (idNotFavourite !== indexString) {
        continue;
      } else if (idNotFavourite === indexString) {
        this.flagOne = true;
        break;
      }
    } if (this.flagOne === true) {
      this.user.favourite.splice(indexRemoved, 1);
      console.log(this.user.favourite);
      this.userService.userUpdate(this.user).subscribe(res => {console.log(res);
      } );
      alert('unmarked as a favourite');
    } else {
      alert('already not a favourite');
    }
    this.flagOne = false;
  }

}
