import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {UserService} from '../shared/user.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injerctor: Injector) { }
  intercept(req, next){
    let userService=this.injerctor.get(UserService)
    let tokenizedReq=req.clone({
      setHeaders:{

        Authorization: `Bearer ${userService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
