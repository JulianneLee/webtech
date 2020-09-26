import {Component, Inject} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-manager',
  templateUrl: 'add-manager.component.html',
})

export class AddManagerDialog {
  constructor(
    public dialogRef: MatDialogRef<AddManagerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  animal: string;
  name: string;
}
