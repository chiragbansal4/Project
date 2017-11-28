import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    id;
    id1;
    constructor( private activateRoute: ActivatedRoute,
    private route: Router) { }
  ngOnInit() {
    this.id = +this.activateRoute.snapshot.paramMap.get('id');
    this.id1 = this.id;
    console.log(this.id);
    const url = this.route.url;
    console.log(url);
  }
  login() {
    this.route.navigate(['userLogin']);
}
  logout() {
    this.route.navigate(['userLogin']);
    alert('logout done');
    }
}
