import { Component } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppService } from '../../app-service'
import { TestCase } from '../../app-model'

@Component({
  selector: 'dialog-view-pending',
  templateUrl: 'view-test-result.component.html',
})

export class ViewTestResultDialog {
  testID: number = 0;
  testCase: TestCase;
  title: string

  constructor(
    public dialogRef: MatDialogRef<ViewTestResultDialog>,
    public appService: AppService) {}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.testCase = this.appService.getTestByID(this.testID);
    this.getTitle();
  }

  getTitle(){
    if(this.testCase.status == 'Pending'){
      return this.title = 'Pending Test'
    } else {
      return this.title = 'Completed Test'
    }
  }

}
