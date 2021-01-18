import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;
// import user service

import {UserService}from '../../shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers : [UserService]
})
export class RegistrationComponent implements OnInit {
hide=true;
show:boolean=false;
showSuccessMessage1:String='';
  showSuccessMessage!: boolean;
  serverErrorMessage!: String;
emailPattern=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(public userService: UserService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
     this.userService.postUser(form.value)
         .subscribe(
      res =>{
        this.showSuccessMessage1= "Registration is completed. Please log in to verify.";
        swal("Registration is completed. Please log in to verify.");
        this.show=true;
        //this._router.navigate=(['/ticket'])
        //this._router.navigate(['/booking'])
        
        this.resetForm(form);
      },
      err =>{
        this.serverErrorMessage=err.error;
        swal("Invalid Email ID");
      }
    )
  }
    resetForm(form: NgForm){
      this.userService.selectedUser={
        name:'',
        email:'',
        password:'',
        age:0
      };
      form.resetForm();
      this.serverErrorMessage='Reset';
    }
}
