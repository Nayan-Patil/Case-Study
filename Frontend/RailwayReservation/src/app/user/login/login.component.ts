import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError=false;
  errorMessage1='';
  errorMessage2='';
trainlogo:String="assets/img/trainbooklogo.jpg"
  loginUserData={
    email:'',
    password:'',
    name:'',
    age:0

  }
  constructor(public userService: UserService,
    private _router: Router) { }

  ngOnInit(): void {
  }
  loginUser(){
    this.userService.loginUser(this.loginUserData)
        .subscribe(
          res=> {console.log(res);
          
            
              this.isLoginError=false;
            localStorage.setItem('token',res.token),
            localStorage.setItem('email',res.email)
            localStorage.setItem('name',res.name)
            localStorage.setItem('age',res.age)
         // this._router.navigate(['/booking'])
            
          },
          err=>{
            console.log(err.error);
            if(err.error=="Invalid email"){
              this.isLoginError=true;
              this.errorMessage1="Wrong email"
            }
            else if(err.error=="Invalid Password"){
              this.isLoginError=true;
              this.errorMessage1="Invalid Password";
            }
                }      )
  }

}
