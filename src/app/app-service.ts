import * as model from './app-model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
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
  private errorUpdated = new Subject<string>();
  private error: string;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  addSampleData(){
    this.addUser('admin', 'admin', 'Admin 1', 'Admin', null);
    // this.addUser('manager1', 'manager1', 'Manager 1', 'Manager', null);
    // this.addUser('patient1', 'patient1', 'Patient 1', 'Patient', null);
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

  // getUserLogin(){
  //   var token = this.getToken().split(" ")[0];
  //   let user = this.users.find(x => x.username == token[0]);
  //   if(user){
  //     this.setCurrentUserID(user.userID);
  //   }
  //   return user;
  // }

  getUserLogin(username: string, password: string){
    let authData: model.AuthData = {username: username, password: password};
    this.http.post<{token:string, id:string}>('http://localhost:3000/api/users/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.setCurrentUserID(response.id);
        this.authStatusListener.next(true);
      })
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getToken(){
    return this.token;
  }

  // logout
  logout(){
    this.token = null;
    this.authStatusListener.next(false);
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
    .post<{message: string, id: string}>('http://localhost:3000/api/users/signup', user)
    .subscribe(
      (responseData) => {
        user.userID = responseData.id;
        this.users.push(user);
        this.userUpdated.next([...this.users])
        this.error = null;
        this.errorUpdated.next(this.error)
      },
      (err) => {
        this.error = err.statusText;
        console.log(this.error)
        this.errorUpdated.next(this.error)
      });
  }

  handleError(httpError: HttpErrorResponse){
    console.log(httpError.statusText);
    this.error = httpError.statusText
    this.errorUpdated.next(this.error)
    return throwError(httpError);
  }

  getError(){
    return this.error
  }

  getErrorListener(){
    return this.errorUpdated.asObservable();
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
      .subscribe(
        (responseData) => {
          testCenter.centerID = responseData.id;
          this.testCenters.push(testCenter);
          this.testCenterUpdated.next([...this.testCenters]);
          this.error = null;
          this.errorUpdated.next(this.error)
        },
        (err) => {
          this.error = err.statusText;
          console.log(this.error)
          this.errorUpdated.next(this.error)
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
      this.http
        .post<{message:string, id:string}>('http://localhost:3000/api/testCases', test)
        .subscribe((responseData) => {
          test.testID = responseData.id;
          this.testCases.push(test);
          this.testCaseUpdated.next([...this.testCases]);
        });
  }

  getTestKitUpdatedListener(){
    return this.testKitUpdated.asObservable();
  }

  // get all test kits
  getTestKit(){
    this.http.get<{message: string, results: any}>('http://localhost:3000/api/testKits')
      .pipe(map((data) => {
        return data.results.map(item => {
          return {
            kitID: item._id,
            name: item.name,
            stock: item.stock,
            centerID: item.centerID
          };
        });
      }))

      .subscribe(transformedData => {
        this.testKits = transformedData;
        this.testKitUpdated.next([...this.testKits])
      });
  }

  // get test kit stock by id
  getTestKitStockById(id:string){
    return this.testKits.find(x => x.kitID == id);
  }

  // get all test kits that have active status with center name
  getTestKitCenter(testKits:model.TestKit[],testCenters:model.TestCenter[]){
    let kit = testKits;
    let center = testCenters;
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
  addTestKit(name:string, stock:number, centerID:string){
    const testKit: model.TestKit = {
      kitID: null, name:name, stock:stock, centerID:centerID
    }
    this.http
      .post<{message:string, id:string}>('http://localhost:3000/api/testKits', testKit)
      .subscribe(
        (responseData) => {
          testKit.kitID = responseData.id;
          this.testKits.push(testKit);
          this.testKitUpdated.next([...this.testKits]);
          this.error = null;
          this.errorUpdated.next(this.error)
        },
        (err) => {
          this.error = err.statusText;
          console.log(this.error)
          this.errorUpdated.next(this.error)
        });
  }

  // update test kit
  updateTestKit(id:string, stock:number, name:string, centerID:string){
    const testKit: model.TestKit = {kitID:id, stock:stock, name:name, centerID:centerID}
    this.http.put('http://localhost:3000/api/testKits/' + id, testKit)
      .subscribe((responseData)=>{
        this.testKits.find(x => x.kitID == id).stock = stock;
        this.testKitUpdated.next([...this.testKits]);
      })
  }

  // delete test kit
  deleteTestKit(id:string){
    this.http.delete('http://localhost:3000/api/testKits/' + id)
      .subscribe(()=>{
        const updatedTestKits = this.testKits.filter(k => k.kitID !== id);
        this.testKits = updatedTestKits;
        this.testKitUpdated.next([...this.testKits]);
      })
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
  updateTest(id:string, patientID:string, officerID:string, result:string, status:string,
    resultCreated:string, type:string, symptom:string, testCreated:string){
      const testCase: model.TestCase = {testID: id, patientID: patientID, officerID: officerID,
        result: result, status: status, resultCreated: resultCreated,
        type: type, symptom: symptom, testCreated: testCreated}

        this.http.put('http://localhost:3000/api/testCases/' + id, testCase)
          .subscribe((responseData) => {
            const test = this.testCases.findIndex(x => x.testID == id)
            this.testCases[test].status = status
            this.testCases[test].resultCreated = resultCreated
            this.testCases[test].result = result
            this.testCases[test].type = type
            this.testCases[test].symptom = symptom
            this.testCaseUpdated.next([...this.testCases])
          })
  }

  // generate report
  generateReport(){
    let reports: model.GenerateReport[] = [];
    let centers = this.testCenters;

    for(let i = 0; i < centers.length; i++){
      let centerTestCases: model.TestCaseViewModel[]
        = this.getTestCasesWithCenterID(centers[i].centerID);
      reports.push({
        centerID:centers[i].centerID,
        centerName:centers[i].name,
        managerName:this.users.find(x => x.userID == centers[i].managerID).name,
        testCases:centerTestCases
      })
    }
    return reports;
  }

  // get test cases with center ID
  getTestCasesWithCenterID(id:string){
    let officer = this.users.filter(x => x.centerID == id);
    let centerTestCases:model.TestCaseViewModel[] = [];

    officer.forEach(o => {
      let testsByTester = this.testCases.filter(x => x.officerID == o.userID);
      testsByTester.forEach(tc => {
        centerTestCases.push({
          testID:tc.testID,
          patientName:this.users.find(x => x.userID == tc.patientID).name,
          officerName:o.name,
          testCreated:tc.testCreated,
          status:tc.status
        });
      });
    });
    return centerTestCases.sort(this.compare('status', 'desc'));
  }

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
