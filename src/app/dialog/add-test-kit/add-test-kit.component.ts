import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'

import { AppService } from '../../app-service'
import { TestCenter } from '../../app-model'

@Component({
  selector: 'dialog-add-test-kit',
  templateUrl: 'add-test-kit.component.html',
})

export class AddTestKitDialog {
  centers: TestCenter [] = [];

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddTestKitDialog>,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.centers = this.appService.getTestCenter()
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAddTestKit(form: NgForm){
    if(form.valid){
      this.appService.addTestKit(
        form.value.name, form.value.stock, form.value.centerID)
      this.snackBar.open("Test Kit has been successfully added.", "close", {duration: 2000,});
      this.dialogRef.close();
    }
  }
}
