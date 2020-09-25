import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module'
import { MatPaginatorModule } from '@angular/material/paginator'
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog'

import { AppComponent } from './app.component';
import { TestCaseComponent } from './test-case/test-case.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TestCaseComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatPaginatorModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

 }

