import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from '../../app-service';
@Component({
  selector: 'dialog-add-manager',
  templateUrl: 'add-manager.component.html',
})

export class AddManagerDialog {
  hide = true;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddManagerDialog>,
    public snackBar: MatSnackBar
  ) {}

  onClose(): void {
    this.dialogRef.close();
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
      this.snackBar.open("Manager has been successfully added.", "close", {duration: 2000,});
      this.dialogRef.close();
    }
  }
}

