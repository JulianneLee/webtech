import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../../app-service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-manager',
  templateUrl: 'add-manager.component.html',
})

export class AddManagerDialog {
  hide = true;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddManagerDialog>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onAddManager(form: NgForm){
    if(form.valid){
      this.appService.addUser(
        form.value.username,
        form.value.password,
        form.value.name,
        'Manager',
        null
      )
      this.dialogRef.close();
    }
  }
}

