import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../shared/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginAdminData={}
  constructor(private adminService: AdminService,
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
           err=> console.log(err)
         )
  }

}
