import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { ViewPendingDialog } from '../dialog/view-pending/view-pending.component'

@Component({
  selector: 'app-test-history',
  templateUrl: 'test-history.component.html',
  styleUrls: ['test-history.component.css'],
})

export class TestHistoryComponent implements AfterViewInit{
  displayedTestHisPen: string[] = ['no', 'testDate', 'symptom', 'action'];
  dataTestHisPen = new MatTableDataSource<TestHisPenElement>(TESTHISPEN);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedTestHisComp: string[] = ['no', 'testDate', 'symptom', 'action'];
  dataTestHisComp = new MatTableDataSource<TestHisCompElement>(TESTHISCOMP);
  @ViewChild('table2', {read: MatPaginator}) additionalPaginator: MatPaginator;
  @ViewChild('table2', {read: MatSort, static: true}) additionalSort: MatSort;

  ngAfterViewInit(){
    this.dataTestHisPen.paginator = this.paginator;
    this.dataTestHisPen.sort = this.sort;

    this.dataTestHisComp.sort = this.additionalSort;
    this.dataTestHisComp.paginator = this.additionalPaginator;
  }

  constructor(public dialog: MatDialog) {}

  openDialogViewPending(): void {
    const dialogRef = this.dialog.open(ViewPendingDialog, {
      width: '100%'
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

export interface TestHisPenElement {
  no: number;
  testDate: string;
  symptom: string;
}

const TESTHISPEN: TestHisPenElement[] = [
  {no: 1, testDate: '27/07/2020', symptom: "testing"},
  {no: 2, testDate: '10/08/2020', symptom: "testing"},
  {no: 3, testDate: '5/09/2020', symptom: "testing"}
];

export interface TestHisCompElement {
  no: number;
  testDate: string;
  symptom: string;
}

const TESTHISCOMP: TestHisCompElement[] = [
  {no: 1, testDate: '04/07/2020', symptom: "testing"},
  {no: 2, testDate: '10/09/2020', symptom: "testing"}
];
