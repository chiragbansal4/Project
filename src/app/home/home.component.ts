import {Component, OnInit} from '@angular/core';
import {Users} from '../UserStructure/UserStructure';
import {UserLoginService} from '../UserStructure/user-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserLoginService]
})
export class HomeComponent implements OnInit {
  title = 'Welcome to my blog';
  users: Users[] = [];

  constructor(private userService: UserLoginService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const e = document.getElementById('exampleInputEmail1');
    const email = (<HTMLInputElement>e).value;
    const eOne = document.getElementById('exampleInputPassword1');
    const password = (<HTMLInputElement>eOne).value;
    this.userService.getUsers(email, password).subscribe(res => {
      this.users = res as Users[];
      console.log(this.users);
      let flag = 0;
      for (const user of this.users) {
        if (user.emailId === email && user.password === password && user.id > '0') {
          flag = 1;
          alert('login success');
          const id = '/userLogin/' + user.id + '/home';
          this.router.navigate([id]);
          break;
        }
      }
      if (flag !== 1) {
        alert('login failed try again or continue as a guest');
        this.router.navigate(['/userLogin']);
      }
    }, err => {
      console.log(err);
    });
  }

  guest() {
    const id = '/userLogin' + '/0' + '/home';
    this.router.navigate([id]);
  }
  instructions() {
    this.router.navigate(['']);
  }
}
