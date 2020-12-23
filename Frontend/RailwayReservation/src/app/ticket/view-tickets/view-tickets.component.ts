import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/shared/ticket.service';
import {UserService} from '../../shared/user.service';
import * as printJS from 'print-js';
import {Ticket} from '../../shared/ticket.model';
import swal from 'sweetalert';
@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.css']
})
export class ViewTicketsComponent implements OnInit {
  tickets={
    
  }
  ticket={

  }
  public show:boolean=false;
  pnr!:String;
  constructor(private ticketService:TicketService,
    private userService: UserService) { }
  email1=this.userService.getEmail();
    ngOnInit(): void {
  }

  viewTickets(){
    this.ticketService.viewTicket(this.email1)
        .subscribe(
          (res:any)=>{
            console.log(res),
            this.tickets=res,
            console.log(this.email1),
            this.show=true
          },
          (err:any)=>console.log(err)
        )
  }
  deleteTicket(pnr: any){
    this.ticketService.cancelTicket(pnr)
        .subscribe(
          (res:any)=>{
            console.log(res);
            swal("Ticket is deleted");
            console.log(pnr)
          },
          (err:any)=>console.log(err)
        )
  }
  print(){
    
    printJS({printable: this.tickets, properties: ['source','destination','trainName', 'trainNumber', 'dTime','aTime','pnr','totalFare'], type: 'json'})
  }

}
