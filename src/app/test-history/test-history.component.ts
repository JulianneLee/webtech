import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { ViewTestResultDialog } from '../dialog/view-test-result/view-test-result.component'
import { AppService } from '../app-service'
import { TestCase } from '../app-model'

@Component({
  selector: 'app-test-history',
  templateUrl: 'test-history.component.html',
  styleUrls: ['test-history.component.css'],
})

export class TestHistoryComponent implements AfterViewInit{

  testPen: TestCase[] = [];
  displayedTestHisPen: string[] = ['testID', 'testDate', 'type', 'action'];
  dataTestHisPen = new MatTableDataSource<TestCase>();
  @ViewChild('table1', {read: MatPaginator}) paginator: MatPaginator;
  @ViewChild('table1', {read: MatSort, static: true}) sort: MatSort;

  testComp: TestCase[] = [];
  displayedTestHisComp: string[] = ['testID', 'testDate', 'type', 'action'];
  dataTestHisComp = new MatTableDataSource<TestCase>();
  @ViewChild('table2', {read: MatPaginator}) additionalPaginator: MatPaginator;
  @ViewChild('table2', {read: MatSort, static: true}) additionalSort: MatSort;

  ngAfterViewInit(){
    this.dataTestHisPen.paginator = this.paginator;
    this.dataTestHisPen.sort = this.sort;

    this.dataTestHisComp.sort = this.additionalSort;
    this.dataTestHisComp.paginator = this.additionalPaginator;
  }

  ngOnInit(){
    this.testPen = this.appService.getTestPending();
    this.dataTestHisPen = new MatTableDataSource<TestCase>(this.testPen);

    this.testComp = this.appService.getTestCompleted();
    this.dataTestHisComp = new MatTableDataSource<TestCase>(this.testComp);
  }

  constructor(public dialog: MatDialog,
    public appService: AppService) {}

  openDialogViewPending(id:number): void {
    const dialogRef = this.dialog.open(ViewTestResultDialog, {
      width: '500px'
    });

    dialogRef.componentInstance.testID = id;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyFilterPending(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTestHisPen.filter = filterValue.trim().toLowerCase();

    if (this.dataTestHisPen.paginator) {
      this.dataTestHisPen.paginator.firstPage();
    }
  }

  applyFilterCompleted(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTestHisComp.filter = filterValue.trim().toLowerCase();

    if (this.dataTestHisComp.paginator) {
      this.dataTestHisComp.paginator.firstPage();
    }
  }
}
