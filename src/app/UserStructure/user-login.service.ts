import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Users} from './UserStructure';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserLoginService {
  constructor(private http: Http) { }
  getUsers(email: string, password: string): Observable<Users[]> {
    const BASE_URL = 'http://localhost:5001/Users/';
    return this.http.get(BASE_URL)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  getUser(id: string): Observable<Users> {
    const url = 'http://localhost:5001/users/' + id;
    return this.http.get(url)
      .map(res => res.json() as Users).catch(err => {return Observable.throw(err);
      });
  }
  getUsersDetails(info: string): Observable<Users[]> {
    const BASE_URL = 'http://localhost:5001/Users?userName=' + info ;
    return this.http.get(BASE_URL)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  getUsersDetailsEmail(info: string): Observable<Users[]> {
    const BASE_URL = 'http://localhost:5001/Users?emailId=' + info ;
    return this.http.get(BASE_URL)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  postUser(user: Users): Observable<Users[]> {
    const url = 'http://localhost:5001/users/';
    user.favourite = [];
    return this.http.post(url, user)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }
  userUpdate (user: Users) {
    const url = 'http://localhost:5001/users/' + user.id;
    return this.http.put(url, user)
      .map(res => res.json()).catch(err => {return Observable.throw(err);
      });
  }

}

