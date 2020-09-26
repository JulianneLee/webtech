import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { AddPatientDialog } from '../dialog/add-patient/add-patient.component';
import { AddTestDialog } from '../dialog/add-test/add-test.component'
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-test-case',
  templateUrl: 'test-case.component.html',
  styleUrls: ['test-case.component.css'],
})

export class TestCaseComponent implements AfterViewInit {
  breakpoint: number;

  displayedTestCaseCol: string[] = ['no', 'name', 'type', 'symptom', 'status', 'action'];
  dataTestCase = new MatTableDataSource<TestCaseElement>(TESTCASE);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedPatientCol: string[] = ['no', 'name', 'username'];
  dataPatient = new MatTableDataSource<PatientElement>(PATIENT);
  @ViewChild('table2', {read: MatPaginator}) additionalPaginator: MatPaginator;
  @ViewChild('table2', {read: MatSort}) additionalSort: MatSort;

  ngAfterViewInit() {
    this.dataTestCase.paginator = this.paginator;
    this.dataTestCase.sort = this.sort;

    this.dataPatient.sort = this.additionalSort;
    this.dataPatient.paginator = this.additionalPaginator;
  }

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialogPatient(): void {
    const dialogRef = this.dialog.open(AddPatientDialog, {
      width: '300px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogTest(): void {
    const dialogRef = this.dialog.open(AddTestDialog, {
      width: '300px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  applyFilterTestCase(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTestCase.filter = filterValue.trim().toLowerCase();

    if (this.dataTestCase.paginator) {
      this.dataTestCase.paginator.firstPage();
    }
  }

  applyFilterPatient(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataPatient.filter = filterValue.trim().toLowerCase();

    if (this.dataPatient.paginator) {
      this.dataPatient.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }
}

export interface TestCaseElement {
  no: number;
  name: string;
  type: string;
  symptom: string;
  status: string;
}

const TESTCASE: TestCaseElement[] = [
  {no: 1, name: 'Alex', type: "Returnee", symptom: "testing", status: "Pending"},
  {no: 2, name: 'Lillia', type: "Quarantined", symptom: "testing", status: "Completed"},
  {no: 3, name: 'Samira', type: "Infected", symptom: "testing", status: "Pending"},
  {no: 4, name: 'Yone', type: "Suspected", symptom: "testing", status: "Completed"},
  {no: 5, name: 'Lux', type: "Infected", symptom: "testing", status: "Pending"}
];

export interface PatientElement {
  no: number;
  name: string;
  username: string;
}

const PATIENT: PatientElement[] = [
  {no: 1, name: 'Lillia12', username: "Lillia"},
  {no: 2, name: 'YoneYas', username: "Yone"},
  {no: 3, name: 'Alex12', username: "Alex"},
  {no: 4, name: 'SamiraS', username: "Samira"},
  {no: 5, name: 'LuxEzreal', username: "Lux"}
];
