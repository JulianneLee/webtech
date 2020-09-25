import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { AddPatientDialog } from '../dialog/add-patient/add-patient.component';

@Component({
  selector: 'app-test-case',
  templateUrl: 'test-case.component.html',
  styleUrls: ['test-case.component.css'],
})

export class TestCaseComponent implements AfterViewInit {
  //mode = new FormControl('push');
  breakpoint: number;

  displayedColumns: string[] = ['testID', 'name', 'type', 'symptom', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPatientDialog, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }
}

export interface PeriodicElement {
  testID: string;
  name: string;
  type: string;
  symptom: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {testID: "1", name: 'Hydrogen', type: "Returnee", symptom: "testing", status: "Pending"},
  {testID: "2", name: 'Helium', type: "Quarantined", symptom: "testing", status: "Completed"},
  {testID: "3", name: 'Lithium', type: "Infected", symptom: "testing", status: "Pending"},
  {testID: "4", name: 'Beryllium', type: "Suspected", symptom: "testing", status: "Completed"},
  {testID: "5", name: 'Boron', type: "Infected", symptom: "testing", status: "Pending"}
];

