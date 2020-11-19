import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'

import { AppService } from '../../app-service'
import { TestCenter, TestKit } from '../../app-model'

@Component({
  selector: 'dialog-add-test-kit',
  templateUrl: 'add-test-kit.component.html',
})

export class AddTestKitDialog {
  testCenters: TestCenter [] = [];
  testKits: TestKit [] = [];
  msg: string;
  testKitsSub: Subscription;
  testCentersSub: Subscription;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddTestKitDialog>,
    public snackBar: MatSnackBar
  ){}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    // retrieve from data from api
    this.appService.getTestCenter();

    // retrieve updated test center and kit arrays
    this.testCentersSub = this.appService.getTestCenterUpdatedListener()
      .subscribe((testCenters: TestCenter[]) => {
        this.testCenters = testCenters;
      })
    this.testKitsSub = this.appService.getTestKitUpdatedListener()
      .subscribe((testKits: TestKit[]) => {
        this.testKits = testKits;
      })
  }

  // pass form value
  onAddTestKit(form: NgForm){
    if(form.valid){
      this.appService.addTestKit(
        form.value.name,
        form.value.stock,
        form.value.centerID
        );
      this.appService.getErrorListener()
        .subscribe((error) =>{
          if(error){
            this.msg = "This Test Kit name exists! " +
                        "Please use another name or edit the stock.";
          } else {
            this.msg = "Test Kit added successfully!"
            this.dialogRef.close();
          }
          this.snackBar.open(this.msg, "close", {duration: 2000,});
        })
    }
  }
}
