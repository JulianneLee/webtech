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
    this.reports = this.appService.generateReport();
    console.log(this.reports)
  }

  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    ) {}
}
