import { Injectable } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Admin} from './admin.model';
import {Train} from './train.model';
@Injectable({
  providedIn: 'root'
})

  
export class AdminService {
  selectedAdmin: Admin={
    email:'',
    password:''
    }

    selectedTrain : Train={
      trainNumber:"",
      trainName:"",
      source:"",
      destination:"",
      vacantSeats:'',
      distance:'',
      dTime:'',
      aTime:''
    };

    form:FormGroup= new FormGroup({
      trainNumber:new FormControl(),
      trainName:new FormControl(''),
      source:new FormControl(''),
      destination:new FormControl(''),
      dTime:new FormControl(''),
      aTime:new FormControl(''),
      vacantSeats:new FormControl(),
      distance:new FormControl()
    })
  
  constructor(private http:HttpClient)
   { }

   loginAdmin(admin:any){
     return this.http.post<any>("https://1349qzbv96.execute-api.us-west-1.amazonaws.com/production/admin/login",admin);
   }
   loggedIn(){
   
    return !!localStorage.getItem('token')
    
  }
   getAllTrains(){
     return this.http.get("https://1349qzbv96.execute-api.us-west-1.amazonaws.com/production/allTrains/");
   }
   updateTrain(train:Train){
     return this.http.put("https://1349qzbv96.execute-api.us-west-1.amazonaws.com/production/updateTrain/"+train.trainNumber,train)
   }

   deleteTrain(trainNumber:any){
     return this.http.delete("https://1349qzbv96.execute-api.us-west-1.amazonaws.com/production/deleteTrain/"+trainNumber);
   }

   getToken(){
    return localStorage.getItem('token')
  }

  postTrain(train: Train){
    return this.http.post("https://1349qzbv96.execute-api.us-west-1.amazonaws.com/production/addTrains/",train);
  }
  populateForm(train: Train){
    this.form.setValue(train);
  }
}
