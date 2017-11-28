import {Component, OnInit} from '@angular/core';
import {UserLoginService} from '../UserStructure/user-login.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Users} from '../UserStructure/UserStructure';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
  , providers: [UserLoginService]
})
export class UserHomeComponent implements OnInit {

  user: Users = new Users();

  constructor(private userService: UserLoginService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      const id = params['id'];
      return this.userService.getUser(id);
    }).subscribe(response => {
      this.user = response as Users;
    }, err => {
      console.log(err);
    });
  }
}
