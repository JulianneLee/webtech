import * as model from './app-model';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class AppService {
  private users: model.User[] = [];
  private testCases: model.TestCase[] = [];
  private testCenters: model.TestCenter[] = [];
  private testKits: model.TestKit[] = [];
  private currentUserID = null;

  addSampleData(){
    this.addUser('admin', 'admin', 'Admin 1', 'Admin', null);
    this.addUser('manager1', 'manager1', 'Manager 1', 'Manager', null);
    this.addUser('tester1', 'tester1', 'Tester 1', 'Tester', 1);
    this.addUser('patient1', 'patient1', 'Patient 1', 'Patient', null);
    this.addUser('tester2', 'tester2', 'Tester 2', 'Tester', 2);
    this.addUser('manager2', 'manager2', 'Manager 2', 'Manager', null);
    this.addTestCenter('Center 1', 2);
    this.addTestCenter('Center 2', 6);
    this.addTest(4, 'Suspected', 'flu', 3);
    this.addTest(4, 'Close Contact', 'fever', 3);
    this.addTest(4, 'Suspected', 'flu', 5);
    this.setCurrentUserID(1); //admin
    // this.setCurrentUserID(2); //manager
    // this.setCurrentUserID(3); //tester
    // this.setCurrentUserID(4); //patient
  }

  // get current login user detail
  getCurrentUser(){
    return this.users.find(x => x.userID == this.currentUserID);
  }

  // set current login user ID
  setCurrentUserID(userID:number){
    this.currentUserID = userID
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
  getUserByID(id:number){
    return this.users.find(x => x.userID == id).name
  }

  // get all users
  getUsers(){
    return this.users;
  }

  // add user
  addUser(username:string, password:string, name:string, position:string, centerID:number){
    const user: model.User = {
      userID:(this.getUsers().length + 1), username:username, password:password,
      name:name, position:position, centerID:centerID,
    };
    this.users.push(user);
  }

  // get all test centers
  getTestCenter(){
    return this.testCenters;
  }

  // add test center
  addTestCenter(name:string, id:number){
    const testCenter: model.TestCenter = {
      centerID:this.getTestCenter().length + 1,
      name:name,
      managerID:id
    };
    this.testCenters.push(testCenter);
  }

  // get all test cases
  getTests(){
    return this.testCases;
  }

  // add test case
  addTest(patientID:number, type:string, symptom:string, officerID:number){
    const test: model.TestCase = {testID:this.getTests().length + 1,
      patientID:patientID, type:type, symptom:symptom, officerID:officerID,
      testCreated: new Date().toString(), status: 'Pending', result:null, resultCreated:null}
    this.testCases.push(test);
  }

  // get all test kits
  getTestKit(){
    return this.testKits;
  }

  // get test kit stock by id
  getTestKitStockById(id:number){
    return this.testKits.find(x => x.kitID == id);
  }

  // get all test kits that have active status with center name
  getTestKitCenter(){
    let kit = this.getTestKit().filter(x => x.status == 'Active');
    let center = this.getTestCenter();
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
      kitID: this.getTestKit().length + 1,
      name:name, stock:stock, centerID:centerID, status:'Active'
    }
    this.testKits.push(testKit);
  }

  // update test kit
  updateTestKit(id:number, stock:number){
    return this.testKits.find(x => x.kitID == id).stock = stock;
  }

  // delete test kit
  deleteTestKit(id:number){
    return this.testKits.find(x => x.kitID == id).status = 'Deleted';
    // return this.testKits.splice(this.testKits.findIndex(x => x.kitID == id), 1);
  }

  // get test case by id
  getTestByID(id:number){
    return this.testCases.find(s => s.testID == id);
  }

  // return list of joined tables on test case and user
  getPatientTest(){
    let patients = this.getPatients();
    let tests = this.getTests();
    let patientTest = [];

    for(let i = 0; i < tests.length; i++){
      let pName = patients.find(x => x.userID == tests[i].patientID).name;
      patientTest.push({testID:tests[i].testID, name:pName, type:tests[i].type,
        symptom:tests[i].symptom, testCreated:tests[i].testCreated, status:tests[i].status})
    }
    return patientTest;
  }

  //
  updateTest(id:number, result:string, status:string, resultCreated:string,
    type:string, symptom:string){
    let upTest = this.getTestByID(id);
    upTest.status = status;
    upTest.resultCreated = resultCreated;
    upTest.result = result;
    upTest.type = type;
    upTest.symptom = symptom;

    return upTest;
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
  getTestCasesWithCenterID(id:number){
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
    return centerTestCases;
  }
}
