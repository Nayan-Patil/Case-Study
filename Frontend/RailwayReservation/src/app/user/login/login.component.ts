import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
trainlogo:String="assets/img/trainbooklogo.jpg"
  loginUserData={}
  constructor(private userService: UserService,
    private _router: Router) { }

  ngOnInit(): void {
  }
  loginUser(){
    this.userService.loginUser(this.loginUserData)
        .subscribe(
          res=> {console.log(res),
            localStorage.setItem('token',res.token),
            localStorage.setItem('userName',res.email)
            localStorage.setItem('name',res.name)
            localStorage.setItem('age',res.age)
         // this._router.navigate(['/booking'])
          },
          err=>console.log(err)
        )
  }

}
