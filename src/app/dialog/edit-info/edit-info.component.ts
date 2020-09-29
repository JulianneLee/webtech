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
  date: string;


  constructor(
    public dialogRef: MatDialogRef<EditInfoDialog>,
    public appService: AppService) {}


  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.testCase = this.appService.getTestByID(this.testID);
    this.user = this.appService.getUserByID(this.testCase.patientID);
    this.tester = this.appService.getUserByID(this.testCase.officerID);

    this.selectedType = this.testCase.type;
  }

  editInfo(form: NgForm){
    if(form.valid){
      this.appService.updateTest(
        this.testID,
        null,
        this.testCase.status,
        null,
        form.value.type ? form.value.type:this.testCase.type,
        form.value.symptom);
      this.dialogRef.close();
    }
    console.log(this.testCase.type)
    console.log(this.testCase.symptom)
  }

  type: Type[] = [
    {value: 'Returnee', viewValue: 'Returnee'},
    {value: 'Quarantined', viewValue: 'Quarantined'},
    {value: 'Close Contact', viewValue: 'Close Contact'},
    {value: 'Infected', viewValue: 'Infected'},
    {value: 'Suspected', viewValue: 'Suspected'},
  ];


}
