import { Component, OnInit } from '@angular/core';
import { HomeService} from '../shared/home.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
 img1:String="assets/img/railtour1.jpg";
 img2:String="assets/img/domestic1.jpg";
 img3:String="assets/img/international1.jpg";

  
  trainData={
     
     source:'',
     destination:''
   }
   
   public show :boolean=false;
  // public show1 :boolean=false;
   trainsList:any;
  constructor(public homeService:HomeService,
              private _router:Router ) { }

  ngOnInit(): void {
   
  }
  
searchTrain(){
  this.homeService.searchTrain(this.trainData.source, this.trainData.destination)
  .subscribe(
    (    res: any)=>{ console.log(res),
                      this.trainsList=res,
                      this.show=true;
    },
    (    err: any)=>console.log(err)
  )

}

selectTrain(train:any){
  console.log(train);
  console.log(typeof(train))
  console.log(train.trainNumber)
}
 
}
