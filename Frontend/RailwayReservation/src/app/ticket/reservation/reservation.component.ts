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
show:boolean=false;
totalFare=0;
 selectedTrain={
  trainNumber:0,
  trainName:''
  
}
/*addScript:boolean=false;
finalAmount:number=1;
paypalConfig={
  env:'sandbox',
  client:{
    sandbox:"AeIo5Y7ehj6Kd0Wcx3CEbFCxQEe9ckqVbmsvTwnHDHSQX1jDjSDaGLde1NvLXur0qsDOleGUegrcIRHW",
    production:"<your-production-key>"

  },
  commit:true,
  payment:(data, actions)=>{
    return actions.payment.create({
      payment:{
        transactions:[
          {amount:{total:this.finalAmount, currency:"INR"}}
        ]
      }  
    });
  },
  onAuthorize:(data,actions)=>{
    return actions.payment.execute().then((payment)=>{
      console.log("payment success")
    })
  }
}
ngAfterViewChecked(): void{
  if(!this.addScript){
    this.addPaypalScript().then((payment)=>{
        paypal.button.render(this.paypalConfig, '#paypal-checkout-btn');
    })
  }
}
addPaypalScript(){
  this.addScript=true;
  return new Promise((resolve,reject)=>{
    let scriptagElement=document.createElement('script');
    scriptagElement.src='http://www.paypalobjects.com/api/checkout.js';
    scriptagElement.onload=resolve;
    document.body.appendChild(scriptagElement);
  })
}
*/
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
trainsList={}
  constructor(private ticketService : TicketService,
    private homeService:HomeService,
    private userService:UserService,
    private winRef: WindowRefService
              ) { }

  ngOnInit(): void {
    
  }
email1=this.userService.getEmail();
  
ticketData={
  userName:'this.email1',
  source:'',
  destination:'',
  trainName:'',
  classType:'',
  noOfTickets:0
  
}
  bookTicket(){
    this.ticketService.bookTicket(this.ticketData)
         .subscribe(
           res=>{console.log(res),
            this.show=true;
            this.totalFare=res.totalFare;
            this.payWithRazor();
            
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
    options.handler = ((response) => {
        options['payment_response_id'] = response.razorpay_payment_id;
        this.paymentService.payWithRazor({cart: finalObj, payment: options});
    });
    options.modal.ondismiss = (() => {
        this.loginService.SetLoader = false;
    });
    let rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
}  

}



