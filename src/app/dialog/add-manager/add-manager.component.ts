import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs'

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
  usersSub: Subscription;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddManagerDialog>,
    public snackBar: MatSnackBar
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.appService.getUsers();
    this.usersSub = this.appService.getUserUpdatedListener()
      .subscribe((users: User[]) => {
        this.users = this.appService.getManagers();
      })
  }

  // pass form value to addUser function
  onAddManager(form: NgForm){
    if(form.valid){
      this.appService.addUser(
        form.value.username,
        form.value.password,
        form.value.name,
        'Manager',
        null
      )
      this.appService.getErrorListener()
        .subscribe((error) =>{
          if(error){
            this.msg = "Username exists!"
          } else {
            this.msg = "Manager added successfully!"
            this.dialogRef.close();
          }
          this.snackBar.open(this.msg, "close", {duration: 2000,});
        })
    }
  }
}

