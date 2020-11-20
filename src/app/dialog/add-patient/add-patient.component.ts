import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs'

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
  usersSub: Subscription;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddPatientDialog>,
    public snackBar: MatSnackBar) {}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.appService.getUsers();
    this.usersSub = this.appService.getUserUpdatedListener()
      .subscribe((users: User[]) => {
        this.users = users;
      })
  }

  // add patient
  onAddPatient(form: NgForm){
    if(form.valid){
      this.appService.addUser(
        form.value.username,
        form.value.password,
        form.value.name,
        'Patient',
        null);
      this.appService.getErrorListener()
        .subscribe((error) =>{
          if(error){
            this.msg = "Username exists!"
          } else {
            this.msg = "Patient added successfully!"
            this.dialogRef.close();
          }
          this.snackBar.open(this.msg, "close", {duration: 2000,});
        })
    }
  }
}
