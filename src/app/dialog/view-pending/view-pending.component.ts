import { Component, Inject } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-view-pending',
  templateUrl: 'view-pending.component.html',
})

export class ViewPendingDialog {
  constructor(
    public dialogRef: MatDialogRef<ViewPendingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClose(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
