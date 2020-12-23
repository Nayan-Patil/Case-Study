import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router, RouterEvent} from '@angular/router';
//import {Search} from '../shared/search.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import{Train} from '../shared/search.model';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
 train: Train={
   source:'',
   destination:""
 }
  
  constructor(private http: HttpClient,
    private router: Router) { }


searchTrain(source:String, destination:String):
Observable<Train> {
  return this.http.get<Train>("http://localhost:3000/trainList/"+source+'/'+destination)

}




/*{
  return this.http.get("http://localhost:(3000/trainList")
              .map((res:Response)=> res.json())
              .catch((error: any)=>Observable.throw(error.json().error));
}*/
}