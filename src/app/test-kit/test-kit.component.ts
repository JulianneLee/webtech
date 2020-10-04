import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'

import { AppService } from '../app-service';
import { TestKitViewModel } from '../app-model';
import { AddTestKitDialog } from '../dialog/add-test-kit/add-test-kit.component';
import { UpdateTestKitDialog } from '../dialog/update-test-kit/update-test-kit.component';

@Component({
  selector: 'app-test-kit',
  templateUrl: 'test-kit.component.html',
})

export class TestKitComponent implements AfterViewInit {
  testCenters: TestKitViewModel[] = [];
  displayedColumns: string[] = ['kitID', 'name', 'stock', 'centerName', 'action'];
  dataSource = new MatTableDataSource<TestKitViewModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    this.testCenters = this.appService.getTestKitCenter();
    this.dataSource = new MatTableDataSource<TestKitViewModel>(this.testCenters);
  }

  constructor(
    public dialog: MatDialog,
    public appService: AppService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTestKitDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.data = this.appService.getTestKitCenter();
    });
  }

  // open dialog and pass selected testkit to update
  openDialogUpdate(id:number): void {
    const dialogRef = this.dialog.open(UpdateTestKitDialog, {
      width: '300px',
    });

    dialogRef.componentInstance.testKitID = id;

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.data = this.appService.getTestKitCenter();
    });
  }

  // delete test kit
  onDelete(id:number): void {
    if(this.appService.deleteTestKit(id))
      this.dataSource.data = this.appService.getTestKitCenter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
