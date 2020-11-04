import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'
import { Subscription } from 'rxjs';

import { AppService } from '../app-service';
import { TestCenter } from '../app-model';
import { AddTestCenterDialog } from '../dialog/add-test-center/add-test-center.component';

@Component({
  selector: 'app-test-center',
  templateUrl: 'test-center.component.html',
})

export class TestCenterComponent implements AfterViewInit {
  testCentersSub: Subscription;
  displayedColumns: string[] = ['centerID', 'name'];
  dataSource = new MatTableDataSource<TestCenter>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    this.appService.getTestCenter();
    this.testCentersSub = this.appService.getTestCenterUpdatedListener()
      .subscribe((testCenters: TestCenter[]) => {
        this.dataSource = new MatTableDataSource<TestCenter>(testCenters);
      })
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
      this.testCentersSub = this.appService.getTestCenterUpdatedListener()
      .subscribe((testCenters: TestCenter[]) => {
        this.dataSource.data = testCenters;
      })
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
