import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'

import { AddTestCenterDialog } from '../dialog/add-test-center/add-test-center.component';

@Component({
  selector: 'app-test-center',
  templateUrl: 'test-center.component.html',
})

export class TestCenterComponent implements AfterViewInit {
  displayedColumns: string[] = ['no', 'name'];
  dataSource = new MatTableDataSource<TestCenter>(TESTCENTER);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTestCenterDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  applyFilterTestCenter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface TestCenter {
  no: number;
  name: string;
}

const TESTCENTER: TestCenter[] = [
  {no: 1, name: 'Clinic Tan'},
  {no: 2, name: 'Ali Baba'},
  {no: 3, name: 'People Center'},
];

