import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'

import { AppService } from '../app-service';
import { TestCenter } from '../app-model';
import { AddTestCenterDialog } from '../dialog/add-test-center/add-test-center.component';

@Component({
  selector: 'app-test-center',
  templateUrl: 'test-center.component.html',
})

export class TestCenterComponent implements AfterViewInit {
  testCenters: TestCenter[] = this.appService.getTestCenter();
  displayedColumns: string[] = ['centerID', 'name'];
  dataSource = new MatTableDataSource<TestCenter>(this.testCenters);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    public dialog: MatDialog,
    public appService: AppService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTestCenterDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.data = this.appService.getTestCenter();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
