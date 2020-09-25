import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { DemoMaterialModule } from './material-module';

// import { MatPaginatorModule } from '@angular/material/paginator'
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
// import { MatSidenavModule } from '@angular/material/sidenav'
// import { MatGridListModule } from '@angular/material/grid-list'
// import { MatCardModule } from '@angular/material/card'
// import { MatTableModule } from '@angular/material/table';
// import { MatDialogModule } from '@angular/material/dialog'

import { AppComponent } from './app.component';
import { TestCaseComponent } from './test-case/test-case.component'
import { AddPatientDialog } from './dialog/add-patient/add-patient.component'
import { AddManagerDialog } from './dialog/add-manager/add-manager.component'
import { AddTestDialog } from './dialog/add-test/add-test.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TestCaseComponent,
    AddPatientDialog,
    AddManagerDialog,
    AddTestDialog,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    DemoMaterialModule,
    FormsModule,
    // MatSidenavModule,
    // MatPaginatorModule,
    // MatGridListModule,
    // MatCardModule,
    // MatTableModule,
    // MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

 }

