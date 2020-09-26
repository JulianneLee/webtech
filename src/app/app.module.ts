import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { DemoMaterialModule } from './material-module';

import { AppComponent } from './app.component';
import { TestCaseComponent } from './test-case/test-case.component'
import { ManagerComponent } from './manager/manager.component'
import { TestKitComponent } from './test-kit/test-kit.component'
import { TestCenterComponent } from './test-center/test-center.component'

import { AddPatientDialog } from './dialog/add-patient/add-patient.component'
import { AddManagerDialog } from './dialog/add-manager/add-manager.component'
import { AddTestDialog } from './dialog/add-test/add-test.component'
import { EditInfoDialog } from './dialog/edit-info/edit-info.component'
import { UpdateTestDialog } from './dialog/update-test/update-test.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TestCaseComponent,
    ManagerComponent,
    TestKitComponent,
    TestCenterComponent,
    AddPatientDialog,
    AddManagerDialog,
    AddTestDialog,
    EditInfoDialog,
    UpdateTestDialog,
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

