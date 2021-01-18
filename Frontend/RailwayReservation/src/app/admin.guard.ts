import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

//import { Observable } from 'rxjs';
//import {UserService} from '../app/shared/user.service';
import {AdminService} from '../app/shared/admin.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public adminService:AdminService,
    private router: Router){

  }
  canActivate():boolean{
    if(this.adminService.loggedIn()){
    
      return true
    }else{
      
      return false
    }
  }
  

}
