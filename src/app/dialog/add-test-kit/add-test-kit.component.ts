import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'

import { AppService } from '../../app-service'
import { TestCenter, TestKit } from '../../app-model'

@Component({
  selector: 'dialog-add-test-kit',
  templateUrl: 'add-test-kit.component.html',
})

export class AddTestKitDialog {
  centers: TestCenter [] = [];
  testKits: TestKit [] = [];
  msg: string;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddTestKitDialog>,
    public snackBar: MatSnackBar
  ){}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.centers = this.appService.getTestCenter();
    this.testKits = this.appService.getTestKit();
  }

  // pass form value
  onAddTestKit(form: NgForm){
    if(form.valid){
      if(this.testKits.find(x => x.name == form.value.name &&
          x.centerID == form.value.centerID &&
          x.status != "Deleted")){
        this.msg = 'This Test Kit name exists! ' +
                    'Please use another name or edit the stock.';
      } else {
        this.msg = 'Test Kit has been successfully added.'
        this.appService.addTestKit(form.value.name,
          form.value.stock, form.value.centerID);
        this.dialogRef.close();
      }
      this.snackBar.open(this.msg, "close", {duration: 4000,});
    }
  }
}
