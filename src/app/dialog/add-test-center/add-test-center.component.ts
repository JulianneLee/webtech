import {Component, Inject} from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-test-center',
  templateUrl: 'add-test-center.component.html',
})

export class AddTestCenterDialog {
  constructor(
    public dialogRef: MatDialogRef<AddTestCenterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  animal: string;
  name: string;
}
