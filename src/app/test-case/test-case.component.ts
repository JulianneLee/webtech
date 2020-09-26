import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { AddPatientDialog } from '../dialog/add-patient/add-patient.component';
import { AddTestDialog } from '../dialog/add-test/add-test.component'

@Component({
  selector: 'app-test-case',
  templateUrl: 'test-case.component.html',
  styleUrls: ['test-case.component.css'],
})

export class TestCaseComponent implements AfterViewInit {
  breakpoint: number;

  displayedTestCaseCol: string[] = ['testID', 'name', 'type', 'symptom', 'status', 'action'];
  dataTestCase = new MatTableDataSource<TestCaseElement>(TESTCASE);

  displayedPatientCol: string[] = ['testID', 'name', 'type', 'symptom'];
  dataPatient = new MatTableDataSource<PatientElement>(PATIENT);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataTestCase.paginator = this.paginator;
    this.dataPatient.paginator = this.paginator;
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

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }
}

export interface TestCaseElement {
  testID: string;
  name: string;
  type: string;
  symptom: string;
  status: string;
}

const TESTCASE: TestCaseElement[] = [
  {testID: "1", name: 'Hydrogen', type: "Returnee", symptom: "testing", status: "Pending"},
  {testID: "2", name: 'Helium', type: "Quarantined", symptom: "testing", status: "Completed"},
  {testID: "3", name: 'Lithium', type: "Infected", symptom: "testing", status: "Pending"},
  {testID: "4", name: 'Beryllium', type: "Suspected", symptom: "testing", status: "Completed"},
  {testID: "5", name: 'Boron', type: "Infected", symptom: "testing", status: "Pending"}
];

export interface PatientElement {
  testID: string;
  name: string;
  type: string;
  symptom: string;
}

const PATIENT: PatientElement[] = [
  {testID: "1", name: 'Hydrogen', type: "Returnee", symptom: "testing"},
  {testID: "2", name: 'Helium', type: "Quarantined", symptom: "testing"},
  {testID: "3", name: 'Lithium', type: "Infected", symptom: "testing"},
  {testID: "4", name: 'Beryllium', type: "Suspected", symptom: "testing"},
  {testID: "5", name: 'Boron', type: "Infected", symptom: "testing"}
];
