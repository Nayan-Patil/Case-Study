import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService} from '../../../shared/home.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() selectedTrain: EventEmitter<any> =   new EventEmitter();
  trainData={
     
    source:String,
    destination:String
  }
  //selectedTrain={}
  trainsList={}
 constructor(private homeService:HomeService ) { }

 ngOnInit(): void {
  
 }
searchTrain(){
 this.homeService.searchTrain(this.trainData.source, this.trainData.destination)
 .subscribe(
   (    res: any)=>{ console.log(res),
                     this.trainsList=res
   },
   (    err: any)=>console.log(err)
 )

}
selectTrain(train:any){
 console.log(train);
 //this.selectedTrain=train
 this.selectedTrain.emit(train)
 console.log("Selected ",this.selectedTrain)
 console.log(typeof(train))
 console.log(train.trainNumber)
}

}
