import { Component, OnInit, HostListener } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AdminService} from '../../shared/admin.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-train-update',
  templateUrl: './train-update.component.html',
  styleUrls: ['./train-update.component.css'],
  providers:[AdminService]
})
export class TrainUpdateComponent implements OnInit {

  constructor(private adminService:AdminService,
        private router: Router,
        private dialogRef: MatDialogRef<TrainUpdateComponent>) { }
        @HostListener('window:keyup.esc') onKeyUp() {
          this.dialogRef.close();
        }
  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.adminService.updateTrain(form.value)
        .subscribe(
          res=>{
            swal("Train is Updated");
            this.onClose();
            
          },
          err=>{
            console.log(err)
          }
        )
  }
  onClose(){
 // this.adminService.postTrain(form.value).resetForm();
 this.dialogRef.close();
}

}
