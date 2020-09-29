import { Component } from '@angular/core';
import { FormControl } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Router, ActivatedRoute } from '@angular/router'
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
  indexPage = true;

  changeTitle(headerTitle): void {
    this.headerTitle = headerTitle;
    this.indexPage = false;
  }

  constructor(
    public appService: AppService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.appService.addSampleData();
    this.currentUser = this.appService.getCurrentUser();
  }

  openDialogLogin(){
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser = this.appService.getCurrentUser();
    });
  }

  logout(): void {
    this.appService.logout();
    this.currentUser = this.appService.getCurrentUser();
    this.snackBar.open("You have logged out.", "close", {duration: 2000,});
    this.router.navigate(['/index'])
  }
}
