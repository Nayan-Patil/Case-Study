import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

//import { Observable } from 'rxjs';
import {UserService} from '../app/shared/user.service';
import {AdminService} from '../app/shared/admin.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService,
    public adminService:AdminService,
    private router: Router){

  }
  canActivate():boolean{
    if(this.userService.loggedIn()||this.adminService.loggedIn()){
     // this.router.navigate(['/ticket'])
      return true
    }else{
      this.router.navigate(['/user/logIn'])
      return false
    }
  }
  

}
