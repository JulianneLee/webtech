import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule, routingComponents } from './app-routing.module'
import { DemoMaterialModule } from './material-module';

import { AppComponent } from './app.component';
import { TestCaseComponent } from './test-case/test-case.component'
import { ManagerComponent } from './manager/manager.component'
import { TestCenterComponent } from './test-center/test-center.component'
import { OfficerComponent } from './officer/officer.component'
import { TestKitComponent } from './test-kit/test-kit.component'
import { ReportComponent } from './report/report.component'
import { TestHistoryComponent } from './test-history/test-history.component'

import { AddPatientDialog } from './dialog/add-patient/add-patient.component'
import { AddManagerDialog } from './dialog/add-manager/add-manager.component'
import { AddTestDialog } from './dialog/add-test/add-test.component'
import { AddTestKitDialog } from './dialog/add-test-kit/add-test-kit.component';
import { UpdateTestKitDialog } from './dialog/update-test-kit/update-test-kit.component';
import { AddTestCenterDialog } from './dialog/add-test-center/add-test-center.component';
import { AddOfficerDialog } from './dialog/add-officer/add-officer.component';
import { EditInfoDialog } from './dialog/edit-info/edit-info.component'
import { UpdateTestDialog } from './dialog/update-test/update-test.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TestCaseComponent,
    ManagerComponent,
    OfficerComponent,
    TestKitComponent,
    TestCenterComponent,
    ReportComponent,
    AddPatientDialog,
    AddManagerDialog,
    AddTestDialog,
    AddTestKitDialog,
    UpdateTestKitDialog,
    AddTestCenterDialog,
    AddOfficerDialog,
    EditInfoDialog,
    UpdateTestDialog,
    TestHistoryComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    DemoMaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

 }

