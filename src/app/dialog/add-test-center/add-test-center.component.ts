import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'

import { AppService } from '../../app-service'
import { TestCenter } from '../../app-model';

@Component({
  selector: 'dialog-add-test-center',
  templateUrl: 'add-test-center.component.html',
})

export class AddTestCenterDialog {
  centers: TestCenter[] = [];
  msg: string;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddTestCenterDialog>,
    public snackBar: MatSnackBar
  ){}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.centers = this.appService.getTestCenter();
  }

  // pass form value to addTestCenter function
  onAddTestCenter(form: NgForm){
    if(form.valid){
      if(this.centers.find(x => x.name == form.value.name)){
        this.msg = 'Test Center name exist!'
      } else{
        this.msg = 'Test Center has been successfully added.'
        this.appService.addTestCenter(form.value.name, this.appService.getCurrentUser().userID)
        this.dialogRef.close();
      }
      this.snackBar.open(this.msg, "close", {duration: 2000,});
    }
  }
}
