import { Component } from '@angular/core';
import { FormControl } from '@angular/forms'
import { AppService } from './app-service'

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
    public appService: AppService
  ){}

  ngOnInit(){
    this.appService.addSampleData();
    this.currentUser = this.appService.getCurrentUser();
    console.log(this.appService.getCurrentUser());
  }

  logout(): void {
    this.appService.logout();
  }
}
