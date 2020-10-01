import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'

import { AppService } from '../../app-service'

@Component({
  selector: 'dialog-add-test-center',
  templateUrl: 'add-test-center.component.html',
})

export class AddTestCenterDialog {
  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddTestCenterDialog>,
    public snackBar: MatSnackBar
  ){}

  onClose(): void {
    this.dialogRef.close();
  }

  // pass form value to addTestCenter function
  onAddTestCenter(form: NgForm){
    if(form.valid){
      this.appService.addTestCenter(form.value.name, this.appService.getCurrentUser().userID)
      this.snackBar.open("Test Center has been successfully added.", "close", {duration: 2000,});
      this.dialogRef.close();
    }
  }
}
