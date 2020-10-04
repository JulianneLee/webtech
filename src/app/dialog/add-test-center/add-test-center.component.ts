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
  testCenter: TestCenter[] = [];
  msg: string = 'The Test Center is existed. Please input another name.';

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
      for(let i = 0; i < this.testCenter.length; i++){
        if(this.testCenter.find(x => x.name == form.value.name)){
        } else{
          this.msg = 'Test Center has been successfully added.'
          this.appService.addTestCenter(form.value.name, this.appService.getCurrentUser().userID)
          this.dialogRef.close();
        }
      }
      this.snackBar.open(this.msg, "close", {duration: 2000,});
    }
  }
}
