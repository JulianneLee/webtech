import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule, routingComponents } from './app-routing.module'
import { DemoMaterialModule } from './material-module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component'
import { TestCaseComponent } from './test-case/test-case.component'
import { ManagerComponent } from './manager/manager.component'
import { TestCenterComponent } from './test-center/test-center.component'
import { OfficerComponent } from './officer/officer.component'
import { TestKitComponent } from './test-kit/test-kit.component'
import { ReportComponent } from './report/report.component'

import { AddPatientDialog } from './dialog/add-patient/add-patient.component'
import { AddManagerDialog } from './dialog/add-manager/add-manager.component'
import { AddTestDialog } from './dialog/add-test/add-test.component'
import { AddTestKitDialog } from './dialog/add-test-kit/add-test-kit.component';
import { UpdateTestKitDialog } from './dialog/update-test-kit/update-test-kit.component';
import { AddTestCenterDialog } from './dialog/add-test-center/add-test-center.component';
import { AddOfficerDialog } from './dialog/add-officer/add-officer.component';
import { EditInfoDialog } from './dialog/edit-info/edit-info.component'
import { UpdateTestDialog } from './dialog/update-test/update-test.component'
import { TestHistoryComponent } from './test-history/test-history.component'
import { ViewTestResultDialog } from './dialog/view-test-result/view-test-result.component'
import { LoginComponent } from './dialog/login/login.component'

import { AuthInterceptor } from './app-auth-interceptor'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    IndexComponent,
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
    ViewTestResultDialog,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    DemoMaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  entryComponents: [
    AddPatientDialog,
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})

export class AppModule {

 }

