import { Component, Inject } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    public appService: AppService) {}

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
    // if(form.valid){
    //   this.appService.updateTest(this.testID, form.value.result, "Completed",
    //   new Date().toString(), this.testCase.type, this.testCase.symptom);
    //   this.dialogRef.close();
    // }

    console.log(this.appService.updateTest(this.testID, form.value.result, "Completed",
    new Date().toString(), this.testCase.type, this.testCase.symptom));
  }
}
