import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TestCaseComponent } from './test-case/test-case.component'
import { ManagerComponent } from './manager/manager.component'
import { TestKitComponent } from './test-kit/test-kit.component'
import { TestCenterComponent } from './test-center/test-center.component'

const routes: Routes = [
  { path: 'testcase', component: TestCaseComponent},
  { path: 'manager', component: ManagerComponent},
  { path: 'testkit', component: TestKitComponent},
  { path: 'testcenter', component: TestCenterComponent},
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
  TestKitComponent,
  TestCenterComponent,
]
