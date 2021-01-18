import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { User } from './shared/user.model';
import {UserService} from './shared/user.service';
import {HomeService} from './shared/home.service';
import {AdminService} from './shared/admin.service';
import { TicketService } from './shared/ticket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RailwayReservation';

  constructor(public userService: UserService,
              public homeService: HomeService,
              public adminService: AdminService,
              public ticketService:TicketService,
              public router:Router){}

}
