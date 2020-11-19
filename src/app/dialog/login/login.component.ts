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
  msg: string;

  constructor(
    private appService: AppService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.appService.getUsers();
  }

  login(form: NgForm){
    this.appService.getUserLogin(form.value.username, form.value.password);
    if(form.valid){
      this.appService.getAuthStatusListener()
        .subscribe(()=>{
          let user = this.appService.getCurrentUser()
          this.appService.getErrorListener()
            .subscribe((error) =>{
              if(error){
                this.msg = "Invalid Username or Password!"
              } else {
                this.msg = "Welcome " + user.name
                this.dialogRef.close();
              }
              this.snackBar.open(this.msg, "close", {duration: 3000,});
            })
        })
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
