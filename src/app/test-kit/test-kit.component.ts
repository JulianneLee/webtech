import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'
import { Subscription } from 'rxjs'

import { AppService } from '../app-service';
import { TestCenter, TestKit, TestKitViewModel } from '../app-model';
import { AddTestKitDialog } from '../dialog/add-test-kit/add-test-kit.component';
import { UpdateTestKitDialog } from '../dialog/update-test-kit/update-test-kit.component';

@Component({
  selector: 'app-test-kit',
  templateUrl: 'test-kit.component.html',
})

export class TestKitComponent implements AfterViewInit {
  testKitsSub: Subscription;
  testCentersSub: Subscription;
  testKitsVM: TestKitViewModel[] = [];
  testCenters: TestCenter[] = [];
  testKits: TestKit[] = [];
  displayedColumns: string[] = ['kitID', 'name', 'stock', 'centerName', 'action'];
  dataSource = new MatTableDataSource<TestKitViewModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    // retrieve from data from api
    this.appService.getTestCenter();
    this.appService.getTestKit();

    // retrieve updated test center and kit arrays
    this.testCentersSub = this.appService.getTestCenterUpdatedListener()
      .subscribe((testCenters: TestCenter[]) => {

        this.testKitsSub = this.appService.getTestKitUpdatedListener()
          .subscribe((testKits: TestKit[]) => {
            this.testKitsVM = this.appService.getTestKitCenter(testKits, testCenters);
            this.dataSource = new MatTableDataSource<TestKitViewModel>(this.testKitsVM);
          })
      })
  }

  constructor(
    public dialog: MatDialog,
    public appService: AppService
  ) {}

  refreshTable(){
    this.testCentersSub = this.appService.getTestCenterUpdatedListener()
      .subscribe((testCenters: TestCenter[]) => {

        this.testKitsSub = this.appService.getTestKitUpdatedListener()
          .subscribe((testKits: TestKit[]) => {
            this.testKitsVM = this.appService.getTestKitCenter(testKits, testCenters);
            this.dataSource.data = this.testKitsVM;
          })
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTestKitDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable()
    });
  }

  // open dialog and pass selected testkit to update
  openDialogUpdate(id:string): void {
    const dialogRef = this.dialog.open(UpdateTestKitDialog, {
      width: '300px',
    });

    dialogRef.componentInstance.testKitID = id;

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable()
    });
  }

  // delete test kit
  onDelete(id:string): void {
    this.appService.deleteTestKit(id)
    this.refreshTable()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
