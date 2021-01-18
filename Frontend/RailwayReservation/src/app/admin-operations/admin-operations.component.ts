import { Component, OnInit } from '@angular/core';
import {AdminService} from '../shared/admin.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddTrainComponent } from '../admin-operations/add-train/add-train.component';
import { TrainUpdateComponent } from '../admin-operations/train-update/train-update.component';
import {Train} from '../shared/train.model';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;
@Component({
  selector: 'app-admin-operations',
  templateUrl: './admin-operations.component.html',
  styleUrls: ['./admin-operations.component.css']
})
export class AdminOperationsComponent implements OnInit {
  allTrains:any;
  show:boolean=false;
  constructor(public adminService:AdminService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  getTrains(){
    this.adminService.getAllTrains()
        .subscribe(
          (res: any)=>{
            this.allTrains=res,
            console.log(res),
            console.log(typeof res),
            this.show=true;
          },
          (err:any)=>{
            console.log(err)
          }
        )
  }
  
  deleteTrain(trainNumber: any){
    this.adminService.deleteTrain(trainNumber)
        .subscribe(
          (res:any)=>{
            console.log(res)
            swal("Train is deleted Successfully.")
          },
          (err:any)=>{
            console.log(err)
          }
        )
  }
  refreshTrainList(){
    this.adminService.getAllTrains().subscribe((res)=>{
      this.adminService.selectedTrain=res as unknown as Train;
    })
  }
  
  addTrain(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(AddTrainComponent, dialogConfig);
    this.refreshTrainList();
  }
  onEdit(train:Train){
    this.adminService.selectedTrain=train;
    this.adminService.updateTrain(train)
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(TrainUpdateComponent, dialogConfig);
  }
  

}
