import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../../app-service'
import { TestCenter } from '../../app-model'

@Component({
  selector: 'dialog-add-officer',
  templateUrl: 'add-officer.component.html',
})

export class AddOfficerDialog {
  centers: TestCenter [] = [];
  hide = true;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddOfficerDialog>
  ){}

  ngOnInit(){
    this.centers = this.appService.getTestCenter()
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAddTester(form: NgForm){
    if(form.valid){
      this.appService.addUser(
        form.value.username,
        form.value.password,
        form.value.name,
        'Tester',
        form.value.centerID
      )
      this.dialogRef.close();
    }
  }
}
