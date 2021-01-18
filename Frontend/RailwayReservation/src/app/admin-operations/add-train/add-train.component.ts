import { Component, OnInit, HostListener } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AdminService} from '../../shared/admin.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-add-train',
  templateUrl: './add-train.component.html',
  styleUrls: ['./add-train.component.css'],
  providers:[AdminService]
})
export class AddTrainComponent implements OnInit {
showSuccessMessage="";
serverErrorMessage=''
show:boolean=false;
  constructor(public adminService: AdminService,
    private router:Router,
    public dialogRef:MatDialogRef<AddTrainComponent>) { }

  ngOnInit(): void {
  }
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
onSubmit(form: NgForm){
  this.adminService.postTrain(form.value)
      .subscribe(
        res=>{
          this.showSuccessMessage="Train Added Successfully";
         swal("Train Added Successfully")
          
          this.resetForm(form);
          this.onClose();
          
        },
        err=>{
          this.serverErrorMessage=err;
          swal("Please use another train number")
        }
      )
}
onClose(){
 // this.adminService.postTrain(form.value).resetForm();
 this.dialogRef.close();
 
}
resetForm(form:NgForm){
  this.adminService.selectedTrain={
    trainNumber:"",
    trainName:'',
    source:'',
    destination:'',
    distance:'',
    vacantSeats:'',
    dTime:"",
    aTime:""
  };
  form.resetForm();
  
}
}
