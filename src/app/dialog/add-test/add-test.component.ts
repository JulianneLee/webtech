import { Component, Inject } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-patient',
  templateUrl: 'add-test.component.html',
})

export class AddTestDialog {
  constructor(
    public dialogRef: MatDialogRef<AddTestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onClose(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
