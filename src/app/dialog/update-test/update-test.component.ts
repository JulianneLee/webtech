import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

import { AppService } from '../../app-service'
import { TestCase } from '../../app-model'

@Component({
  selector: 'dialog-update-test',
  templateUrl: 'update-test.component.html',
})

export class UpdateTestDialog {
  testID:number = 0;
  testCase: TestCase;

  constructor(
    public dialogRef: MatDialogRef<UpdateTestDialog>,
    public appService: AppService,
    public snackBar: MatSnackBar) {}

    onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.testCase = this.appService.getTestByID(this.testID);
    console.log(this.testCase);
    console.log(this.testCase.type);
    console.log(this.testCase.symptom);
  }

  updateTest(form:NgForm){
    if(form.valid){
      this.appService.updateTest(this.testID, form.value.result, "Completed",
      new Date().toString(), this.testCase.type, this.testCase.symptom);
      this.snackBar.open("You have updated the result.", "close", {duration: 2000,});
      this.dialogRef.close();
    }
  }
}
