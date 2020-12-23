import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
img1:String="assets/img/goldenchariot.jpg";
img2:String="assets/img/atulya bharat.jpg";
img3:String="assets/img/MaharajaExpress.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
