import { Component } from '@angular/core'
import { AfterViewInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MatSort } from '@angular/material/sort'

import { AppService } from '../app-service';
import { User } from '../app-model';
import { AddOfficerDialog } from '../dialog/add-officer/add-officer.component';

@Component({
  selector: 'app-officer',
  templateUrl: 'officer.component.html',
})

export class OfficerComponent implements AfterViewInit {
  managers: User[] = this.appService.getTesters();
  displayedColumns: string[] = ['id', 'username', 'name', 'position'];
  dataSource = new MatTableDataSource<User>(this.managers);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    ) {}

  ngOnInit(){
    this.managers = this.appService.getTesters();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddOfficerDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
        this.dataSource.data = this.appService.getTesters();
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
