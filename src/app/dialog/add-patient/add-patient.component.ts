import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AppService } from '../../app-service'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-patient',
  templateUrl: 'add-patient.component.html',
})

export class AddPatientDialog {
  hide = true;
  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddPatientDialog>) {}

    onClose(): void {
    this.dialogRef.close();
  }

  onAddPatient(form: NgForm){
    if(form.valid){
      this.appService.addPatient(form.value.username, form.value.password, form.value.name);
      this.dialogRef.close();
    }
  }
}
