import {Component, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../../app-service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-manager',
  templateUrl: 'add-manager.component.html',
})

export class AddManagerDialog {
  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<AddManagerDialog>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onAddManager(form: NgForm){
    this.appService.addManager(form.value.username, form.value.password, form.value.name);
    form.resetForm();
  }
}

