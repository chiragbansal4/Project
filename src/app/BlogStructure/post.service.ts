import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Post} from './post';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const BASE_URL = 'http://localhost:5001/posts?_sort=postDate&_order=asc';
@Injectable()
export class PostService {
  sharedData: Post = [];
  constructor(private http: Http) { }
  getPosts(): Observable<Post[]> {
    return this.http.get(BASE_URL)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  getPost(id: string): Observable<Post> {
    const url = 'http://localhost:5001/posts/' + id;
    return this.http.get(url)
      .map(res => res.json() as Post).catch(err => {return Observable.throw(err);
      });
  }
  createPost(postOn: Post) {
    const url = 'http://localhost:5001/posts/';
    return this.http.post(url, postOn)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  updatePost(postOf: Post) {
    const url = 'http://localhost:5001/posts/' + postOf.id;
    return this.http.put(url, postOf)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  deletePost(postDelete: Post) {
    const url = 'http://localhost:5001/posts/' + postDelete.id;
    return this.http.delete(url, postDelete);
  }
  getPostsByCategory(categories: string): Observable<Post[]> {
    const url = 'http://localhost:5001/posts?category=' + categories + '&_sort=postDate&_order=asc';
    return this.http.get(url)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  getPostsOfUser(userName: string): Observable<Post[]> {
    const url = 'http://localhost:5001/posts?authorName=' + userName + '&_sort=postDate&_order=asc';
    return this.http.get(url)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  getFavouritePostsOfUser(id: string): Observable<Post> {
    const url = 'http://localhost:5001/posts?id=' + id ;
    return this.http.get(url)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });

  }
}
