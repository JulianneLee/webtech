import { Component, Inject } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppService } from '../../app-service'
import { TestCase } from '../../app-model'

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'dialog-edit-info',
  templateUrl: 'edit-info.component.html',
})

export class EditInfoDialog {
  testID:number = 0;

  selectedType: string;
  testCase: TestCase;
  user: string;
  tester: string;

  constructor(
    public dialogRef: MatDialogRef<EditInfoDialog>,
    public appService: AppService) {}


    onClose(): void {
    this.dialogRef.close();
    //console.log(this.appService.getTestByID(this.testID));

  }

  ngOnInit(){
    this.testCase = this.appService.getTestByID(this.testID);
    this.user = this.appService.getUserByID(this.testCase.patientID);
    this.tester = this.appService.getUserByID(this.testCase.officerID);

    this.selectedType = this.testCase.type;
  }

  editInfo(){

  }

  type: Type[] = [
    {value: 'Returnee', viewValue: 'Returnee'},
    {value: 'Quarantined', viewValue: 'Quarantined'},
    {value: 'Close Contact', viewValue: 'Close Contact'},
    {value: 'Infected', viewValue: 'Infected'},
    {value: 'Suspected', viewValue: 'Suspected'},
  ];


}
