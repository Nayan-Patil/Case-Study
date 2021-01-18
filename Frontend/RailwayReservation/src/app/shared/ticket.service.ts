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
  email:'',
  
  source:'',
  destination:'',
  
  trainName:'',
 totalFare:0,
  classType:'',
  noOfTickets:0,
  journeyDate:'',
  dTime:'',
  aTime:''
  
}
bookTicket(ticket: Ticket){
  return this.http.post("https://8bj5aba2gb.execute-api.us-west-1.amazonaws.com/production/bookTicket/",ticket)
}
viewTicket(email1:String){

  return this.http.get("https://8bj5aba2gb.execute-api.us-west-1.amazonaws.com/production/viewTickets/"+email1)
}
cancelTicket(pnr:String){
  return this.http.delete("https://8bj5aba2gb.execute-api.us-west-1.amazonaws.com/production/cancellation/"+pnr);
}
}