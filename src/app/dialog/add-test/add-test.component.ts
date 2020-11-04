import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'

import { AppService } from '../../app-service'
import { User } from '../../app-model'

@Component({
  selector: 'dialog-add-patient',
  templateUrl: 'add-test.component.html',
})

export class AddTestDialog {
  patients: User [] = [];
  testsSub: Subscription;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddTestDialog>,
    public snackBar: MatSnackBar){}

    onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.patients = this.appService.getPatients(this.patients);

  }

  onAddTest(form: NgForm){
    if(form.valid){
      this.appService.addTest(
        form.value.patientID,
        form.value.type,
        form.value.symptom,
        this.appService.getCurrentUser().userID
        );
      this.snackBar.open("Test has been successfully added.", "close", {duration: 2000,});
      this.dialogRef.close();

    }
  }



}
