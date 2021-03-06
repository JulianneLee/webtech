import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AppService } from '../app-service';
import { GenerateReport } from '../app-model';

@Component({
  selector: 'app-report',
  templateUrl: 'report.component.html',
})

export class ReportComponent {
  reports: GenerateReport[] = [];

  displayedColumns: string[] = ['testID', 'patient', 'tester', 'date', 'status'];

  ngOnInit(){
    this.appService.getTestCenter();
    this.appService.getUsers();
    this.appService.getTests();
    this.appService.getTestCaseUpdatedListener()
      .subscribe(() => {
        this.reports = this.appService.generateReport();
      })
    this.appService.getUserUpdatedListener()
      .subscribe(() => {
        this.reports = this.appService.generateReport();
      })
    this.appService.getTestCenterUpdatedListener()
      .subscribe(() => {
        this.reports = this.appService.generateReport();
      })
  }

  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    ) {}
}
