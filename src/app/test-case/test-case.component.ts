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
  //mode = new FormControl('push');
  breakpoint: number;

  displayedTest: string[] = ['testID', 'name', 'type', 'symptom', 'status', 'action'];
  displayedPatient: string[] = ['patientID', 'username', 'name'];
  dataTest = new MatTableDataSource<TestElement>(TEST_DATA);
  labPatient = new MatTableDataSource<PatientElement>(PATIENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataTest.paginator = this.paginator;
    // this.dataPatient.paginator = this.paginator;
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

export interface TestElement {
  testID: string;
  name: string;
  type: string;
  symptom: string;
  status: string;
}

const TEST_DATA: TestElement[] = [
  {testID: "T1", name: 'Samira', type: "Returnee", symptom: "testing", status: "Pending"},
  {testID: "T2", name: 'Alex', type: "Quarantined", symptom: "testing", status: "Completed"},
  {testID: "T3", name: 'Yone', type: "Infected", symptom: "testing", status: "Pending"},
  {testID: "T4", name: 'Lillia', type: "Suspected", symptom: "testing", status: "Completed"},
  {testID: "T5", name: 'Steve', type: "Infected", symptom: "testing", status: "Pending"}
];

export interface PatientElement {
  patientID: string;
  username: string;
  name: string;
}

const PATIENT_DATA: PatientElement[] = [
  {patientID: "P1", username: "Alex07", name: "Alex"},
  {patientID: "P2", username: "Lillia1", name: "Lillia"},
  {patientID: "P3", username: "Steve99", name: "Steve"},
  {patientID: "P4", username: "Samira", name: "Samira"},
  {patientID: "P5", username: "YoneYas", name: "Yone"}
];
