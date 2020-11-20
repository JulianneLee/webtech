import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { MatSort } from '@angular/material/sort'
import { Subscription } from 'rxjs'

import { AppService } from '../app-service'
import { User, PatientTest, TestCase } from '../app-model'

import { AddPatientDialog } from '../dialog/add-patient/add-patient.component'
import { AddTestDialog } from '../dialog/add-test/add-test.component'
import { EditInfoDialog } from '../dialog/edit-info/edit-info.component'
import { UpdateTestDialog } from '../dialog/update-test/update-test.component'


@Component({
  selector: 'app-test-case',
  templateUrl: 'test-case.component.html',
  styleUrls: ['test-case.component.css'],
})

export class TestCaseComponent implements OnInit {
  breakpoint: number;
  usersSub: Subscription;

  patients: User[] = [];
  displayedPatientCol: string[] = ['patientID', 'name', 'username'];
  dataPatient = new MatTableDataSource<User>();
  @ViewChild('tableTwoPaginator', {read: MatPaginator}) paginatorTwo: MatPaginator;
  @ViewChild('tableTwoSort', {read: MatSort, static: true}) sortTwo: MatSort;

  tests: PatientTest[] = [];
  displayedTestCaseCol: string[] = ['testID', 'name', 'type', 'status', 'action'];
  dataTestCase = new MatTableDataSource<PatientTest>();
  @ViewChild('tableOnePaginator', {read: MatPaginator}) paginatorOne: MatPaginator;
  @ViewChild('tableOneSort', {read: MatSort, static: true}) sortOne: MatSort;

  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    ) {}

  ngOnInit(){
    this.appService.getUsers()
    this.dataPatient = new MatTableDataSource<User>(this.appService.getPatients());
    this.dataTestCase.paginator = this.paginatorOne;
    this.dataTestCase.sort = this.sortOne;

    this.appService.getTests()
    this.dataTestCase = new MatTableDataSource<PatientTest>(this.appService.getPatientTest());
    this.dataPatient.paginator = this.paginatorTwo;
    this.dataPatient.sort = this.sortTwo;
  }

  openDialogPatient(): void {
    const dialogRef = this.dialog.open(AddPatientDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.appService.getUserUpdatedListener();
      this.dataPatient.data = this.appService.getPatients();
    });
  }

  openDialogTest(): void {
    const dialogRef = this.dialog.open(AddTestDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.appService.getTestCaseUpdatedListener()
      .subscribe((testCases: TestCase[]) => {
        this.dataTestCase.data = this.appService.getPatientTest();
      })
    });
  }

  openDialogEdit(id:string): void {
    const dialogRef = this.dialog.open(EditInfoDialog, {
      width: '100%',
    });
    dialogRef.componentInstance.testID = id;
    dialogRef.afterClosed().subscribe(result => {
      this.appService.getTestCaseUpdatedListener()
      .subscribe((testCases: TestCase[]) => {
        this.dataTestCase.data = this.appService.getPatientTest();
      })
    });
  }

  openDialogUpdateTest(id:string): void {
    const dialogRef = this.dialog.open(UpdateTestDialog, {
      width: '400px',
    });
    dialogRef.componentInstance.testID = id;
    dialogRef.afterClosed().subscribe(result => {
      this.appService.getTestCaseUpdatedListener()
      .subscribe((testCases: TestCase[]) => {
        this.dataTestCase.data = this.appService.getPatientTest();
      })
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
}
