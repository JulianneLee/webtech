import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from '../../app-service';
import { User } from '../../app-model';

@Component({
  selector: 'dialog-add-manager',
  templateUrl: 'add-manager.component.html',
})

export class AddManagerDialog {
  hide = true;
  check: string;
  users: User[] = [];
  msg: string;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddManagerDialog>,
    public snackBar: MatSnackBar
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.users = this.appService.getUsers();
    this.msg = 'This username have been created.';
  }

  // pass form value to addUser function
  onAddManager(form: NgForm){
    if(form.valid){
      for(let i = 0; i < this.users.length; i++){
        if(this.users.find(x => x.username == form.value.username)){
        } else {
          this.msg = 'Manager has been successfully added.'
          this.appService.addUser(
            form.value.username,
            form.value.password,
            form.value.name,
            'Manager',
            null
          )
          this.dialogRef.close();
        }
      }
      this.snackBar.open(this.msg, "close", {duration: 2000,});
    }
  }
}

