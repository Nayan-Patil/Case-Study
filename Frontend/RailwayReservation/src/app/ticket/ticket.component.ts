import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
opened=true;
image1:String="assets/img/goldenchariot.jpg"
image2:String="assets/img/atulya bharat.jpg"

constructor(private userService:UserService) { }

  userName=this.userService.getEmail();
  ngOnInit(): void {
  }
  

}
