import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-test-center',
  templateUrl: 'test-history.component.html',
  styleUrls: ['test-history.component.css'],
})

export class TestHistoryComponent implements AfterViewInit{
  displayedTestHisCol: string[] = ['no', 'testDate', 'symptom', 'action'];
  dataTestHis = new MatTableDataSource<TestCaseElement>(TESTCASE);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(){
    this.dataTestHis.paginator = this.paginator;
    this.dataTestHis.sort = this.sort;
  }

  // openDialogEdit(): void {
  //   const dialogRef = this.dialog.open(EditInfoDialog, {
  //     width: '100%',
  //     height: '60%',
  //     // data: {name: this.name, animal: this.animal}
  //   });

  applyFilterPending(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTestHis.filter = filterValue.trim().toLowerCase();

    if (this.dataTestHis.paginator) {
      this.dataTestHis.paginator.firstPage();
    }
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
