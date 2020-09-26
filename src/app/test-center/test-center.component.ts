import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { AddTestCenterDialog } from '../dialog/add-test-center/add-test-center.component';

@Component({
  selector: 'app-test-center',
  templateUrl: 'test-center.component.html',
})

export class TestCenterComponent implements AfterViewInit {
  displayedColumns: string[] = ['no', 'username', 'name', 'position'];
  dataSource = new MatTableDataSource<Manager>(User);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
}

export interface Manager {
  no: number;
  name: string;
  username: string;
  position: string;
}

const User: Manager[] = [
  {no: 1, username: 'Manager3', name: 'Manager3', position: "Manager"},
  {no: 2, username: 'Manager1', name: 'Manager1', position: "Manager"},
  {no: 3, username: 'Manager2', name: 'Manager2', position: "Manager"},
];

