import { Component, Inject } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { MatSort } from '@angular/material/sort'

import { AppService } from '../app-service'
import { User, PatientTest } from '../app-model'

import { AddPatientDialog } from '../dialog/add-patient/add-patient.component'
import { AddTestDialog } from '../dialog/add-test/add-test.component'
import { EditInfoDialog } from '../dialog/edit-info/edit-info.component'
import { UpdateTestDialog } from '../dialog/update-test/update-test.component'


@Component({
  selector: 'app-test-case',
  templateUrl: 'test-case.component.html',
  styleUrls: ['test-case.component.css'],
})

export class TestCaseComponent implements AfterViewInit {
  breakpoint: number;

  tests: PatientTest[] = [];
  displayedTestCaseCol: string[] = ['testID', 'name', 'type', 'status', 'action'];
  dataTestCase = new MatTableDataSource<PatientTest>();
  @ViewChild('table1', {read: MatPaginator}) paginator: MatPaginator;
  @ViewChild('table1', {read: MatSort, static: true}) sort: MatSort;

  patients: User[] = [];
  displayedPatientCol: string[] = ['patientID', 'name', 'username'];
  dataPatient = new MatTableDataSource<User>();
  @ViewChild('table2', {read: MatPaginator}) additionalPaginator: MatPaginator;
  @ViewChild('table2', {read: MatSort, static: true}) additionalSort: MatSort;

  ngAfterViewInit() {
    this.dataTestCase.paginator = this.paginator;
    this.dataTestCase.sort = this.sort;

    this.dataPatient.sort = this.additionalSort;
    this.dataPatient.paginator = this.additionalPaginator;
  }

  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    ) {}

  ngOnInit(){
    this.tests = this.appService.getPatientTest();
    this.dataTestCase = new MatTableDataSource<PatientTest>(this.tests);


    this.patients = this.appService.getPatients();
    this.dataPatient = new MatTableDataSource<User>(this.patients);


    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  openDialogPatient(): void {
    const dialogRef = this.dialog.open(AddPatientDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataPatient.data = this.appService.getPatients();
    });
  }

  openDialogTest(): void {
    const dialogRef = this.dialog.open(AddTestDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataTestCase.data = this.appService.getPatientTest();
    });
  }

  openDialogEdit(id): void {
    const dialogRef = this.dialog.open(EditInfoDialog, {

      width: '100%',
    });
    dialogRef.componentInstance.testID = id;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogUpdateTest(): void {
    const dialogRef = this.dialog.open(UpdateTestDialog, {
      width: '100%',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }
}

// export interface TestCaseElement {
//   no: number;
//   name: string;
//   type: string;
//   symptom: string;
//   status: string;
// }

// const TESTCASE: TestCaseElement[] = [
//   {no: 1, name: 'Alex', type: "Returnee", symptom: "testing", status: "Pending"},
//   {no: 2, name: 'Lillia', type: "Quarantined", symptom: "testing", status: "Completed"},
//   {no: 3, name: 'Samira', type: "Infected", symptom: "testing", status: "Pending"},
//   {no: 4, name: 'Yone', type: "Suspected", symptom: "testing", status: "Completed"},
//   {no: 5, name: 'Lux', type: "Infected", symptom: "testing", status: "Pending"}
// ];

// export interface PatientElement {
//   no: number;
//   name: string;
//   username: string;
// }

// const PATIENT: PatientElement[] = [
//   {no: 1, name: 'Lillia12', username: "Lillia"},
//   {no: 2, name: 'YoneYas', username: "Yone"},
//   {no: 3, name: 'Alex12', username: "Alex"},
//   {no: 4, name: 'SamiraS', username: "Samira"},
//   {no: 5, name: 'LuxEzreal', username: "Lux"}
// ];
