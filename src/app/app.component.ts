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
  headerTitle = 'Dashboard';
  mode = new FormControl('push');

  changeTitle(headerTitle): void {
    this.headerTitle = headerTitle;
  }

  constructor(
    public appService: AppService
  ){}

  ngOnInit(){
    this.appService.addSampleData();
  }
}
