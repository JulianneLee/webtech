import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'

import { AppService } from '../app-service';
import { TestCaseViewModel, GenerateReport } from '../app-model';

@Component({
  selector: 'app-report',
  templateUrl: 'report.component.html',
})

export class ReportComponent implements AfterViewInit {
  reports: GenerateReport[] = [];

  // managers: TestCaseViewModel[] = this.appService.getManagers();
  displayedColumns: string[] = ['testID', 'patient', 'tester', 'date', 'status'];
  // dataSource = new MatTableDataSource<TestCaseViewModel>(this.managers);

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit(){
    this.reports = this.appService.generateReport();
    console.log(this.reports)
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    ) {}

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
