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
  testID:string;
  title: string;
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

    //if else statement for the title
    if(this.testCase.status == "Pending"){
      this.title = "Update Test Result"
    } else {
      this.title = "View Test Result"
    }

    console.log(this.testCase);
    console.log(this.testCase.type);
    console.log(this.testCase.symptom);
  }

  updateTest(form:NgForm){
    if(form.valid){


      this.appService.updateTest(this.testID, this.testCase.patientID, this.testCase.officerID, form.value.result, "Completed",
      new Date().toString(), this.testCase.type, this.testCase.symptom, this.testCase.testCreated);
      this.snackBar.open("You have updated the result.", "close", {duration: 2000,});
      this.dialogRef.close();
    }
  }
}
