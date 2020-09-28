import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../../app-service'

@Component({
  selector: 'dialog-update-test-kit',
  templateUrl: 'update-test-kit.component.html',
})

export class UpdateTestKitDialog {
  testKitID = 0;
  stock = 0;

  constructor(
    public appService: AppService,
    public dialogRef: MatDialogRef<UpdateTestKitDialog>
  ){}

  ngOnInit(){
    this.stock = this.appService.getTestKitStockById(this.testKitID);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onUpdateTestKit(form: NgForm){
    if(form.valid){
      this.appService.updateTestKit(this.testKitID, form.value.stock);
      this.dialogRef.close();
    }
  }
}
