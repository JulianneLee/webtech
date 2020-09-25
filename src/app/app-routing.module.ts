import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  //{ path: 'departments', component: DepartmentListComponent},
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
export const routingComponents = []
