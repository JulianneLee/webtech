import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AppService } from '../../app-service'
import { User } from '../../app-model'
import { MatDialogRef, MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  hide = true;
  user: User;

  constructor(
    private appService: AppService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  onClose(): void {
    this.dialogRef.close();
  }

  login(form: NgForm){
    this.user = this.appService.getUserLogin(form.value.username, form.value.password);
    if(form.valid){
      if(this.user){
        this.snackBar.open("Welcome " + this.user.name, "close", {
          duration: 3000
        });
        this.dialogRef.close();
      } else {
        this.snackBar.open("Invalid Username or Password!", "close", {
          duration: 5000
        });
      }

    }

  }
}
