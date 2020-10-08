import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from '../../app-service'
import { TestCenter, User } from '../../app-model'

@Component({
  selector: 'dialog-add-officer',
  templateUrl: 'add-officer.component.html',
})

export class AddOfficerDialog {
  centers: TestCenter [] = [];
  users: User [] = [];
  hide = true;
  msg: string;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddOfficerDialog>,
    public snackBar: MatSnackBar
  ){}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.centers = this.appService.getTestCenter();
    this.users = this.appService.getUsers();
  }

  // pass form value to addUser function
  onAddTester(form: NgForm){
    if(form.valid){
      if(this.users.find(x => x.username == form.value.username)){
        this.msg = 'Username exists!';
      } else {
        this.msg = 'Tester has been successfully added.'
        this.appService.addUser(
          form.value.username,
          form.value.password,
          form.value.name,
          'Tester',
          form.value.centerID
        )
        this.dialogRef.close();
      }
      this.snackBar.open(this.msg, "close", {duration: 2000,});
    }
  }
}
