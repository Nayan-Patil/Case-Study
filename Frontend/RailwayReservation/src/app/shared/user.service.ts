import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {User} from './user.model';   //Import user class

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User={
    name:'',
    email:'',
    password:'',
   
    age:0
  };

  constructor(private http: HttpClient,
              private router:Router) { }
  
  postUser(user: User){
   return this.http.post("https://xh5lnzal87.execute-api.us-west-1.amazonaws.com/production/registration",user);
  }

  loginUser(user: any){
    return this.http.post<any>("https://xh5lnzal87.execute-api.us-west-1.amazonaws.com/production/login",user);
  }
  loggedIn(){
    //this.router.navigate(['/ticket'])
    return !!localStorage.getItem('token')
    
  }
  loggedoutUser(){
    //this.router.navigate([''])
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('age');
    return localStorage.removeItem('token');
    
  }
  
  getToken(){
    return localStorage.getItem('token')
  }
  getEmail(){
    return localStorage.getItem('email');
  }
  getName(){
    return localStorage.getItem('name')
  }
  getAge(){
    return localStorage.getItem('age')
  }
}
