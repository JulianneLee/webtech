import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs'

import { AppService } from '../../app-service'
import { TestCenter, User } from '../../app-model'

@Component({
  selector: 'dialog-add-officer',
  templateUrl: 'add-officer.component.html',
})

export class AddOfficerDialog {
  testCenters: TestCenter [] = [];
  users: User [] = [];
  hide = true;
  msg: string;
  usersSub: Subscription;
  testCentersSub: Subscription;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddOfficerDialog>,
    public snackBar: MatSnackBar
  ){}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    // retrieve from data from api
    this.appService.getTestCenter();

    // retrieve updated test center and user arrays
    this.testCentersSub = this.appService.getTestCenterUpdatedListener()
      .subscribe((testCenters: TestCenter[]) => {
        this.testCenters = testCenters;
      })
    this.usersSub = this.appService.getUserUpdatedListener()
      .subscribe((users: User[]) => {
        this.users = this.appService.getTesters();
      })
  }

  // pass form value to addUser function
  onAddTester(form: NgForm){
    if(form.valid){
      this.appService.addUser(
        form.value.username,
        form.value.password,
        form.value.name,
        'Tester',
        form.value.centerID
      )
      this.appService.getErrorListener()
        .subscribe((error) =>{
          if(error){
            this.msg = "Username exists!"
          } else {
            this.msg = "Tester added successfully!"
            this.dialogRef.close();
          }
          this.snackBar.open(this.msg, "close", {duration: 2000,});
        })
    }
  }
}
