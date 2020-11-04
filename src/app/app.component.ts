import { Component } from '@angular/core';
import { FormControl } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from './app-service'
import { LoginComponent } from './dialog/login/login.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webtech';
  headerTitle = 'CTS';
  mode = new FormControl('push');
  currentUser = null;

  changeTitle(headerTitle:string): void {
    this.headerTitle = headerTitle;
  }

  constructor(
    public appService: AppService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(){
    // this.appService.addSampleData();
    this.appService.getUsers();
    this.currentUser = this.appService.getCurrentUser();
    this.appService.getTests();
    this.router.navigate(['/index']);
  }

  openDialogLogin(){
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser = this.appService.getCurrentUser();
      console.log(this.currentUser)
      this.headerTitle = "Home";
    });
  }

  logout(): void {
    this.appService.logout();
    this.currentUser = this.appService.getCurrentUser();
    this.snackBar.open("You have logged out.", "close", {duration: 2000,});
    this.router.navigate(['/index']);
    this.headerTitle = "Home";
  }
}
