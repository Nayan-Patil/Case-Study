import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {MatDialog} from '@angular/material/dialog';
import { HomePageComponent } from 'src/app/home-page/home-page.component';
import {SearchComponent} from './search/search.component';
import { HomeService } from 'src/app/shared/home.service';
import {UserService} from '../../shared/user.service';
import { WindowRefService } from '../../shared/window-ref.service';

declare let paypal:any;
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [WindowRefService]
})
export class ReservationComponent implements OnInit {
  isSearchError=false;
 options: String[] = ['CSMT', 'Pune', 'Kanyakumari', 'Nagpur', 'Solapur', 'Jammu', 'Nashik', 'Delhi','Nagpur', 'Solapur', 'Bhuvneshwar', 'Lucknow', 'Gaya'];
  
show:boolean=false;
totalFare:any;
 selectedTrain={
  trainNumber:0,
  trainName:''
  
}

train1={}
//selectedTrain1={}
 /* trainNumber:0,
  trainName:'',
  sourec:'',
  destination:'',
  distance:0,
  vacantSeats:0
  */
 trainData={   
  source:String,
  destination:String
}
//selectedTrain={}
trainsList:any;
ticketDetails:any;
  constructor(public ticketService : TicketService,
    public homeService:HomeService,
    public userService:UserService,
    public winRef: WindowRefService
              ) { }

  ngOnInit(): void {
    
  }
email1=this.userService.getEmail();
  
ticketData={
  email:'',
  source:'',
  destination:'',
  trainName:'',
  classType:'',
  noOfTickets:0,
  aTime:'',
  dTime:'',
  totalFare:0,
  journeyDate:''
}
  bookTicket(){
    this.ticketService.bookTicket(this.ticketData)
         .subscribe(
           res=>{console.log(res),
            this.show=true;
            this.ticketDetails=res;

          this.totalFare=this.ticketDetails.totalFare;
            this.payWithRazor();
            console.log(this.ticketDetails);
            
           // this.finalAmount=res.totalFare;
         // alert("Ticket is booked Successfully with PNR number :"+res.pnr)
        },
           err=>console.log(err)
         )
  }
//dialog

searchTrain(){
  
  this.homeService.searchTrain(this.ticketData.source, this.ticketData.destination)
  .subscribe(
    (    res: any)=>{ console.log(res),
                      this.trainsList=res
    },
    (    err: any)=>console.log(err)
  )
 
 }
 selectTrain(train:any){
  console.log(train);
  this.selectedTrain=train
  //this.selectedTrain=train
  console.log(this.selectedTrain)
  
  console.log(train.trainNumber)
 }
 
 payWithRazor(){ 
  let options:any = {
      "key": "rzp_test_bSwYe82ghBhKtz",
      "amount": 100*(this.totalFare),
      "name": "Rail Yatri",
      "description": "Railway Ticket",
      "image": "./assets/images/logo.png",
      "modal": {
        "escape": false
      }, 
      "prefill": {
        
        "email": this.ticketData.email,
        "method": 'card',
        'card[number]': 0,
        'card[expiry]':0 ,
        'card[cvv]': 0
      },
      "notes": {
        "address": ''      },
      "theme": {
        "color": "#6fbc29"
      }
    };
    options.handler = ((response:any) => {
        options['payment_response_id'] = response.razorpay_payment_id;
        //this.paymentService.payWithRazor({cart: finalObj, payment: options});
    });
    options.modal.ondismiss = (() => {
        console.log('');
    });
    let rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
}  

}



