import { Component, Inject } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-patient',
  templateUrl: 'add-patient.component.html',
})

export class AddPatientDialog {
  constructor(
    public dialogRef: MatDialogRef<AddPatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onClose(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
