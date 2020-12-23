import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

//import { Observable } from 'rxjs';
import {UserService} from '../app/shared/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
    private router: Router){

  }
  canActivate():boolean{
    if(this.userService.loggedIn()){
     // this.router.navigate(['/ticket'])
      return true
    }else{
      this.router.navigate(['/user/logIn'])
      return false
    }
  }

}
