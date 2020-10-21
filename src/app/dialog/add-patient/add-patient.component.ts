import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from '../../app-service'
import { User } from '../../app-model';

@Component({
  selector: 'dialog-add-patient',
  templateUrl: 'add-patient.component.html',
})

export class AddPatientDialog {
  hide = true;
  users: User[] = [];
  msg: string;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddPatientDialog>,
    public snackBar: MatSnackBar) {}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    // this.users = this.appService.getUsers();
  }

  // add patient
  onAddPatient(form: NgForm){
    if(form.valid){
      if(this.users.find(x => x.username == form.value.username)){
        this.msg = 'Username exists!';
      } else {
        this.msg = 'Patient has been successfully added.'
        this.appService.addUser(form.value.username, form.value.password,
          form.value.name, 'Patient', null);
        this.dialogRef.close();
      }
      this.snackBar.open(this.msg, "close", {duration: 2000,});
    }
  }
}
