import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../../app-service'

@Component({
  selector: 'dialog-add-test-center',
  templateUrl: 'add-test-center.component.html',
})

export class AddTestCenterDialog {
  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddTestCenterDialog>
  ){}

  onClose(): void {
    this.dialogRef.close();
  }

  onAddTestCenter(form: NgForm){
    if(form.valid){
      this.appService.addTestCenter(form.value.name)
      this.dialogRef.close();
    }
  }
}
