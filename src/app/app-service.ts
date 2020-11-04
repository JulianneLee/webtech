import * as model from './app-model';

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'

@Injectable({providedIn:'root'})

export class AppService {
  private users: model.User[] = [];
  private testCases: model.TestCase[] = [];
  private testCenters: model.TestCenter[] = [];
  private testKits: model.TestKit[] = [];
  private currentUserID = null;
  private userUpdated = new Subject<model.User[]>();
  private testCenterUpdated = new Subject<model.TestCenter[]>();
  private testCaseUpdated = new Subject<model.TestCase[]>();
  private testKitUpdated = new Subject<model.TestKit[]>();

  addSampleData(){
    this.addUser('admin', 'admin', 'Admin 1', 'Admin', null);
    this.addUser('manager1', 'manager1', 'Manager 1', 'Manager', null);
    this.addUser('patient1', 'patient1', 'Patient 1', 'Patient', null);
    this.addUser('manager2', 'manager2', 'Manager 2', 'Manager', null);
    // this.addTestCenter('Center 1', 2);
    // this.addTestCenter('Center 2', 6);
    // this.addTest(4, 'Suspected', 'flu', 3);
    // this.addTest(4, 'Close Contact', 'fever', 3);
    // this.addTest(4, 'Suspected', 'flu', 5);
    // this.updateTest(1, 'Required to visit the doctor', 'Completed',
    // new Date().toString(), 'Suspected', 'flu');

    // this.setCurrentUserID(1); //admin
    // this.setCurrentUserID(2); //manager
    // this.setCurrentUserID(3); //tester
    // this.setCurrentUserID(4); //patient
  }

  constructor(private http:HttpClient, private router:Router){}

  // get current login user detail
  getCurrentUser(){
    return this.users.find(x => x.userID == this.currentUserID);
  }

  // set current login user ID
  setCurrentUserID(userID:string){
    this.currentUserID = userID
  }

  getUserLogin(username: string, password: string){
    let user: model.User;
    user = this.users.find(x => x.username == username && x.password == password);

    if(user){
      this.setCurrentUserID(user.userID);
    }
    return user;
  }

  // logout
  logout(){
    this.currentUserID = null;
  }

  // get users sort by position
  getManagers(){
    return this.users.filter(x => x.position == 'Manager');
  }

  getTesters(){
    return this.users.filter(x => x.position == 'Tester');
  }

  getPatients(){
    return this.users.filter(x => x.position == 'Patient');
  }

  //get user by id
  getUserByID(id:string){
    return this.users.find(x => x.userID == id).name
  }

  // get all users
  getUsers(){
    this.http.get<{message: string, results: any}>('http://localhost:3000/api/users')
      .pipe(map((data) => {
        return data.results.map(item => {
          return {
            username: item.username,
            password: item.password,
            name: item.name,
            position: item.position,
            centerID: item.centerID,
            userID: item._id
          };
        });
      }))

      .subscribe(transformedData => {
        this.users = transformedData;
        this.userUpdated.next([...this.users])
      });
  }

  getUserUpdatedListener(){
    return this.userUpdated.asObservable();
  }

  // add user
  addUser(username:string, password:string, name:string, position:string, centerID: string){
    const user: model.User = {
      userID:null, username:username, password:password,
      name:name, position:position, centerID:centerID
    };

    this.http
    .post<{message:string, id:string}>('http://localhost:3000/api/users', user)
    .subscribe((responseData) => {
      user.userID = responseData.id;
      this.users.push(user);
      this.userUpdated.next([...this.users]);
    });
  }

  // get all test centers
  getTestCenter(){
    this.http.get<{message: string, results: any}>('http://localhost:3000/api/testCenters')
      .pipe(map((data) => {
        return data.results.map(item => {
          return {
            centerID: item._id,
            name: item.name,
            managerID: item.managerID
          };
        });
      }))

      .subscribe(transformedData => {
        this.testCenters = transformedData;
        this.testCenterUpdated.next([...this.testCenters])
      });
  }

  getTestCenterUpdatedListener(){
    return this.testCenterUpdated.asObservable();
  }

  // add test center
  addTestCenter(name:string, id:string){
    const testCenter: model.TestCenter = {centerID:null, name:name, managerID:id};
    this.http
      .post<{message:string, id:string}>('http://localhost:3000/api/testCenters', testCenter)
      .subscribe((responseData) => {
        testCenter.centerID = responseData.id;
        this.testCenters.push(testCenter);
        this.testCenterUpdated.next([...this.testCenters]);
      });
  }

  getTestCaseUpdatedListener(){
    return this.testCaseUpdated.asObservable();
  }

  // get all test cases
  getTests(){
    this.http.get<{message: string, results: any}>('http://localhost:3000/api/testCases')
      .pipe(map((data) => {
        return data.results.map(item => {
          return {
            testID: item._id,
            patientID: item.patientID,
            type: item.type,
            symptom: item.symptom,
            officerID: item.officerID,
            testCreated: item.testCreated,
            status: item.status,
            result: item.result,
            resultCreated: item.resultCreated
          };
        });
      }))

      .subscribe(transformedData => {
        this.testCases = transformedData;
        this.testCaseUpdated.next([...this.testCases])
      });
    // return this.testCases;
  }

  // add test case
  addTest(patientID:string, type:string, symptom:string, officerID:string){
    const test: model.TestCase = {testID:null,
      patientID:patientID, type:type, symptom:symptom, officerID:officerID,
      testCreated: new Date().toString(), status: 'Pending', result:null, resultCreated:null}
    this.testCases.push(test);
  }

  getTestKitUpdatedListener(){
    return this.testKitUpdated.asObservable();
  }

  // get all test kits
  getTestKit(){
    return this.testKits;
  }

  // get test kit stock by id
  getTestKitStockById(id:number){
    return this.testKits.find(x => x.kitID == id.toString());
  }

  // get all test kits that have active status with center name
  getTestKitCenter(){
    let kit = this.getTestKit().filter(x => x.status == 'Active');
    let center = this.testCenters;
    let kitCenter = [];

    for(let i = 0; i < kit.length; i++){
      let centerName = center.find(x => x.centerID == kit[i].centerID).name;
      kitCenter.push({
        kitID:kit[i].kitID, name:kit[i].name, stock:kit[i].stock, centerName:centerName
      })
    }
    return kitCenter;
  }

  // add test kits
  addTestKit(name:string, stock:number, centerID:number){
    const testKit: model.TestKit = {
      kitID: null,
      name:name, stock:stock, centerID:centerID.toString(), status:'Active'
    }
    this.testKits.push(testKit);
  }

  // update test kit
  updateTestKit(id:number, stock:number){
    return this.testKits.find(x => x.kitID == id.toString()).stock = stock;
  }

  // delete test kit
  deleteTestKit(id:number){
    return this.testKits.find(x => x.kitID == id.toString()).status = 'Deleted';
    // return this.testKits.splice(this.testKits.findIndex(x => x.kitID == id), 1);
  }

  // get test case by id
  getTestByID(id:string){
    return this.testCases.find(s => s.testID == id);
  }

  // return list of joined tables on test case and user
  getPatientTest(){
    let patients = this.getPatients();
    let tests = this.testCases;
    let patientTest = [];

    for(let i = 0; i < tests.length; i++){
      let pName = patients.find(x => x.userID == tests[i].patientID).name;
      patientTest.push({testID:tests[i].testID, name:pName, type:tests[i].type,
        symptom:tests[i].symptom, testCreated:tests[i].testCreated, status:tests[i].status})
    }
    return patientTest;
  }

  // update test
  updateTest(id:string, result:string, status:string, resultCreated:string,
    type:string, symptom:string){
      //patientID, officerID, testCreated
      // const testCase: model.TestCase = {testID: id, result: result, status: status,
      // resultCreated: resultCreated, type: type, symptom: symptom}

      // this.http.put('http://localhost:300/api/testCases/' + id, testCase)
      //   .subscribe((responseData) => {
      //     console.log(responseData)
      //     this.router.navigate(['/'])
      //   })
    // let upTest = this.getTestByID(id);
    // upTest.status = status;
    // upTest.resultCreated = resultCreated;
    // upTest.result = result;
    // upTest.type = type;
    // upTest.symptom = symptom;

    // return upTest;
  }

  // generate report
  // generateReport(){
  //   let reports: model.GenerateReport[] = [];
  //   let centers = this.testCenters;

  //   for(let i = 0; i < centers.length; i++){
  //     let centerTestCases: model.TestCaseViewModel[]
  //       = this.getTestCasesWithCenterID(centers[i].centerID);
  //     reports.push({
  //       centerID:centers[i].centerID,
  //       centerName:centers[i].name,
  //       managerName:this.users.find(x => x.userID == centers[i].managerID).name,
  //       testCases:centerTestCases
  //     })
  //   }
  //   return reports;
  // }

  // get test cases with center ID
  // getTestCasesWithCenterID(id:number){
  //   let officer = this.users.filter(x => x.centerID == id);
  //   let centerTestCases:model.TestCaseViewModel[] = [];

  //   officer.forEach(o => {
  //     let testsByTester = this.testCases.filter(x => x.officerID == o.userID);
  //     testsByTester.forEach(tc => {
  //       centerTestCases.push({
  //         testID:tc.testID,
  //         patientName:this.users.find(x => x.userID == tc.patientID).name,
  //         officerName:o.name,
  //         testCreated:tc.testCreated,
  //         status:tc.status
  //       });
  //     });
  //   });
  //   return centerTestCases.sort(this.compare('status', 'desc'));
  // }

  // dynamic sorting
  compare(key, order = 'asc') {
    return function innerSort(a, b) {
      // element not exists
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
      let position = 0;
      if (varA > varB) {
        position = 1;
      } else if (varA < varB) {
        position = -1;
      }
      return ((order === 'desc') ? (position * -1) : position);
    };
  }

  // get pending result
  getTestPending(){
    return this.testCases.filter(x => x.status == 'Pending' && x.patientID == this.getCurrentUser().userID);
  }

  // get completed result
  getTestCompleted(){
    return this.testCases.filter(x => x.status == 'Completed' && x.patientID == this.getCurrentUser().userID);
  }
}
