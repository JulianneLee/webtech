import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TestCaseComponent } from './test-case/test-case.component'
import { ManagerComponent } from './manager/manager.component'
import { OfficerComponent } from './officer/officer.component'
import { TestKitComponent } from './test-kit/test-kit.component'
import { TestCenterComponent } from './test-center/test-center.component'
import { ReportComponent } from './report/report.component'
import { TestHistoryComponent } from './test-history/test-history.component'
import { IndexComponent } from './index/index.component'

const routes: Routes = [
  { path: 'testcase', component: TestCaseComponent},
  { path: 'manager', component: ManagerComponent},
  { path: 'officer', component: OfficerComponent},
  { path: 'testkit', component: TestKitComponent},
  { path: 'testcenter', component: TestCenterComponent},
  { path: 'report', component: ReportComponent},
  { path: 'testhistory', component: TestHistoryComponent},
  { path: 'index', component: IndexComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{

}

//include the path into it as an array
export const routingComponents = [
  TestCaseComponent,
  ManagerComponent,
  OfficerComponent,
  TestKitComponent,
  TestCenterComponent,
  ReportComponent,
  IndexComponent,
]
