import * as model from './app-model';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class AppService {
  private users: model.User[] = [];
  private testCases: model.TestCase[] = [];
  private patientTests: model.PatientTest[] = [];
  private testCenters: model.TestCenter[] = [];
  private currentUserID;

  addSampleData(){
    this.addUser('admin', 'admin', 'Admin 1', 'Admin', null);
    this.addUser('manager1', 'manager1', 'Manager 1', 'Manager', null);
    this.addUser('tester1', 'tester1', 'Tester 1', 'Tester', null);
    this.addUser('patient1', 'patient1', 'Patient 1', 'Patient', null);
    this.addTestCenter('Center 1');
    // this.setCurrentUserID(1); //admin
    this.setCurrentUserID(2); //manager
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

  // get all users
  getUsers(){
    return this.users;
  }

  // add user
  addUser(username:string, password:string, name:string, position:string, centerID:string){
    const user: model.User = {
      userID:(this.getUsers().length + 1),
      username:username,
      password:password,
      name:name,
      position:position,
      centerID:centerID,
    };
    this.users.push(user);
  }

  // get all test centers
  getTestCenter(){
    return this.testCenters;
  }

  // add test center
  addTestCenter(name:string){
    const testCenter: model.TestCenter = {
      centerID:(this.getTestCenter().length + 1).toString(),
      name:name
    };
    this.testCenters.push(testCenter);
  }

  // get all test cases
  getTests(){
    return this.testCases;
  }

  // add test case
  addTest(patientID:string, type:string, symptom:string, officerID:string){
    const test: model.TestCase = {testID:(this.getTests().length + 1).toString(),
      patientID:patientID, type:type, symptom:symptom, officerID:officerID,
      testCreated: new Date().toString(), status: 'Pending'}
    this.testCases.push(test);
  }

  // get test case by id
  getTestByID(id:string){
    return this.testCases.filter(s => s.testID == id);
  }

  // return list of joined tables on test case and user
  getPatientTest(){
    let patients = this.getPatients();
    let tests = this.getTests();
    let patientTest = [];

    for(let i = 0; i < tests.length; i++){
      let pName = patients.find(x => x.userID.toString() == tests[i].patientID).name;
      patientTest.push({testID:tests[i].testID, name:pName, type:tests[i].type,
        symptom:tests[i].symptom, testCreated:tests[i].testCreated, status:tests[i].status})
    }
    return patientTest;
  }
}
