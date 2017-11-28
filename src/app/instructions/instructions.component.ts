import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  instructionOne = 'EXPLORER BACK BUTTON IS NOT SUPPORTED';
  instructionTwo = 'SHIFT FULL SCREEN VIEW FOR BETTER EXPERIENCE';
  instructionThree = '1.GUEST SESSION IS RESTRICTED IN A WAY THAT IT DOES NOT ALLOW USER TO DELETE BLOG AND POST BLOG.\n' +
    '  A GUEST CAN ONLY VIEW ALL BLOG.';
  instructionFour = '2.REGISTER AS A USER TO POST OR DELETE BLOG. IF NEW USER THEN SIGN UP ELSE LOGIN DIRECTLY.';
  instructionFive = '3.ADMIN CAN POST BLOG AND DELETE BLOG OF ANY USER AS WELL AS CAN POST BLOG OR DELETE OF IT\'S OWN.';
  instructionSix = '4.BLOG CONTAINS A FAVOURITE SECTION FOR EACH USER WHERE A USER FAVOURITE MARKED BLOG IS PRESENT.';
  instructionSeven = '5.CATEGORY SECTION IS THERE WHERE A USE CAN FIND WHICH CATEGORY A BLOG BELONGS TOO.';
  instructionEight = '6.REGISTERED USER CAN POST BLOG BY VISITING POST BLOG TAB AND ALSO CAN UPDATE AND DELETE THEIR OWN POSTED BLOG.';
  constructor(private active: Router) { }

  ngOnInit() {
  }

back() {
    this.active.navigate(['../']);
}
}
