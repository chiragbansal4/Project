import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Category} from './category';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
const BASE_URL = 'http://localhost:5001/category/';
@Injectable()
export class CategoryService {

  constructor(private http: Http) { }
  getCategory(): Observable<Category[]> {
    return this.http.get(BASE_URL)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  getCategories(id: string): Observable<Category> {
    const url = 'http://localhost:5001/category/' + id;
    return this.http.get(url)
      .map(res => res.json() as Category).catch(err => {return Observable.throw(err);
      });
  }
}

