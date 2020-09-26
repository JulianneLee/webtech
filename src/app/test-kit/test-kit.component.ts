import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort'

import { AddTestKitDialog } from '../dialog/add-test-kit/add-test-kit.component';
import { UpdateTestKitDialog } from '../dialog/update-test-kit/update-test-kit.component';

@Component({
  selector: 'app-test-kit',
  templateUrl: 'test-kit.component.html',
})

export class TestKitComponent implements AfterViewInit {
  displayedColumns: string[] = ['no', 'kitID', 'name', 'stock', 'action'];
  dataSource = new MatTableDataSource<TestKit>(TESTKIT);

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
    const dialogRef = this.dialog.open(AddTestKitDialog, {
      width: '300px',
    });
  }

  openDialogUpdate(): void {
    const dialogRef = this.dialog.open(UpdateTestKitDialog, {
      width: '300px',
    });
  }

  onDelete(): void {
  }

  applyFilterTestKit(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface TestKit {
  no: number;
  name: string;
  kitID: string;
  stock: number;
}

const TESTKIT: TestKit[] = [
  {no: 1, kitID: 'KIT001', name: 'KIT 1', stock: 773},
  {no: 2, kitID: 'KIT332', name: 'KIT 2', stock: 345},
  {no: 3, kitID: 'KIT052', name: 'KIT 3', stock: 523},
];

