import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../app-service'
import { User } from '../../app-model'



@Component({
  selector: 'dialog-add-patient',
  templateUrl: 'add-test.component.html',
})

export class AddTestDialog {
  patients: User [] = [];

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddTestDialog>){}

    onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.patients = this.appService.getPatients();

  }

  onAddTest(form: NgForm){
    if(form.valid){
      this.appService.addTest(
        form.value.patientID,
        form.value.type,
        form.value.symptom,
        this.appService.getCurrentUser() ? this.appService.getCurrentUser().userID : null
        );
      this.dialogRef.close();
    }
  }



}
