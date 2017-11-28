import {Component, OnInit} from '@angular/core';
import {Users} from '../UserStructure/UserStructure';
import {UserLoginService} from '../UserStructure/user-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserLoginService]
})
export class RegisterComponent implements OnInit {
  user: Users = new Users();
  users: Users[] = [];
  emailVerified: Users[] = [];

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
    const eTwo = document.getElementById('exampleInputName');
    const userName = (<HTMLInputElement>eTwo).value;

    if (!email.trim() || !password.trim() || !userName.trim()) {
      alert('every field is required');
    } else {
      this.userService.getUsersDetailsEmail(email).subscribe(response => {
        this.emailVerified = response;
        if (this.emailVerified.length > 0) {
          alert('email already present');
        } else {
          this.userService.getUsersDetails(userName).subscribe(res => {
            this.users = res as Users[];
            console.log(this.users);
            if (this.users.length > 0) {
              alert('user with same username already present try with different username');
            } else {
              this.user.emailId = email;
              this.user.userName = userName;
              this.user.password = password;
              this.userService.postUser(this.user).subscribe(responsee => {
                this.user = responsee;
                alert('complete');
                this.router.navigate(['']);
              }, err => {
                console.log(err);
              });
            }
          }, err => {
            console.log(err);
          });
        }
      });
    }
  }

  back() {
    this.router.navigate(['']);
  }
}
