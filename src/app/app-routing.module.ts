import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TestCaseComponent } from './test-case/test-case.component'

const routes: Routes = [
  { path: 'testcase', component: TestCaseComponent},
  //{ path: 'employees', component: EmployeeListComponent}
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
export const routingComponents = [TestCaseComponent]
