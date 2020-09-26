import {Component, Inject} from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-update-test-kit',
  templateUrl: 'update-test-kit.component.html',
})

export class UpdateTestKitDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateTestKitDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  animal: string;
  name: string;
}
