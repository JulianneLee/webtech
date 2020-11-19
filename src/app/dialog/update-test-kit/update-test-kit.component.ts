import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'

import { TestKit } from 'src/app/app-model';
import { AppService } from '../../app-service'

@Component({
  selector: 'dialog-update-test-kit',
  templateUrl: 'update-test-kit.component.html',
})

export class UpdateTestKitDialog {
  testKitID:string;
  testKit: TestKit;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<UpdateTestKitDialog>,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.testKit = this.appService.getTestKitStockById(this.testKitID);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  // pass form value
  onUpdateTestKit(form: NgForm){
    if(form.valid){
      this.appService.updateTestKit(
        this.testKitID, form.value.stock, this.testKit.name, this.testKit.centerID);
      this.snackBar.open("You have updated the test kit.", "close", {duration: 2000,});
      this.dialogRef.close();
    }
  }
}
