import { Component } from '@angular/core'
import { AfterViewInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MatSort } from '@angular/material/sort'

import { AppService } from '../app-service';
import { User } from '../app-model';
import { AddManagerDialog } from '../dialog/add-manager/add-manager.component';

@Component({
  selector: 'app-manager',
  templateUrl: 'manager.component.html',
})

export class ManagerComponent implements AfterViewInit {
  managers: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'name', 'position'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    this.managers = this.appService.getManagers();
    this.dataSource = new MatTableDataSource<User>(this.managers);
  }

  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddManagerDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
        this.dataSource.data = this.appService.getManagers();
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
