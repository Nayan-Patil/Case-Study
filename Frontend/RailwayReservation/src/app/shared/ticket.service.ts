import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Ticket} from './ticket.model';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
export interface Email{
  email:String
}
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  
 // userName=JSON.parse(localStorage.getItem('currentUser')).email;
  constructor(private http:HttpClient,
      private userService:UserService) { }

email1=this.userService.getEmail();
selectedTicket: Ticket={
  userName:'',
  
  source:'',
  destination:'',
  
  trainName:'',
  
  classType:'',
  noOfTickets:0,
  journeyDate:''
  
}
bookTicket(ticket: Ticket){
  return this.http.post("http://localhost:5555/bookTicket/",ticket)
}
viewTicket(email1:String){

  return this.http.get("http://localhost:5555/viewTickets/"+email1)
}
cancelTicket(pnr:String){
  return this.http.delete("http://localhost:5555/cancellation/"+pnr);
}
}