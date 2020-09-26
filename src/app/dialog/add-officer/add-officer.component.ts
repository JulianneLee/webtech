import {Component, Inject} from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-officer',
  templateUrl: 'add-officer.component.html',
})

export class AddOfficerDialog {
  constructor(
    public dialogRef: MatDialogRef<AddOfficerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  animal: string;
  name: string;
}
