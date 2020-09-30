import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AppService } from '../../app-service'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'dialog-add-patient',
  templateUrl: 'add-patient.component.html',
})

export class AddPatientDialog {
  hide = true;
  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddPatientDialog>,
    public snackBar: MatSnackBar) {}

    onClose(): void {
    this.dialogRef.close();
  }

  onAddPatient(form: NgForm){
    if(form.valid){
      this.appService.addUser(form.value.username, form.value.password, form.value.name, 'Patient', null);
      this.snackBar.open("Patient has been successfully added.", "close", {duration: 2000,});
      this.dialogRef.close();
    }
  }
}
