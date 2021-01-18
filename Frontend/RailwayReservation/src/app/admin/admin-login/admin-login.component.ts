import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../shared/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  isLoginError=false;
  errorMessage1='';
  errorMessage2='';
  loginAdminData={
    email:'',
    password:''
  }
  constructor(public adminService: AdminService,
              private roter: Router) { }

  ngOnInit(): void {
  }
  loginAdmin(){
    this.adminService.loginAdmin(this.loginAdminData)
         .subscribe(
           res=>{
             console.log(res)
             localStorage.setItem('token',res.token)
           },
           err=>{ console.log(err.error);
            if(err.error=="Invalid email"){
              this.isLoginError=true;
              this.errorMessage1="Wrong email"
            }
            else if(err.error=="Invalid Password"){
              this.isLoginError=true;
              this.errorMessage1="Invalid Password";
            }

           }
         )
  }

}
