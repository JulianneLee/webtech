import * as model from './app-model';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class AppService {
  private users: model.User[] = [];
  private tests: model.Test[] = [];
  private patientTests: model.PatientTest[] = [];
  private currentUserID;

  addSampleData(){
    this.addUser('admin', 'admin', 'Admin 1', 'Admin', null);
    this.addUser('manager1', 'manager1', 'Manager 1', 'Manager', null);
    this.addUser('tester1', 'tester1', 'Tester 1', 'Tester', null);
    this.addUser('patient1', 'patient1', 'Patient 1', 'Patient', null);
    this.setCurrentUserID(1); //admin
    // this.setCurrentUserID(2); //manager
    // this.setCurrentUserID(3); //tester
    // this.setCurrentUserID(4); //patient
  }

  getManagers(){
    return this.users.filter(x => x.position == 'Manager');
  }

  getTesters(){
    return this.users.filter(x => x.position == 'Tester');
  }

  getPatients(){
    return this.users.filter(x => x.position == 'Patient');
  }

  getCurrentUser(){
    return this.users.find(x => x.userID == this.currentUserID);
  }

  setCurrentUserID(userID:number){
    this.currentUserID = userID
  }

  logout(){
    this.currentUserID = null;
  }

  getUsers(){
    return this.users;
  }

  addUser(username:string, password:string, name:string, position:string, centerID:string){
    const user: model.User = {
      userID:(this.getUsers().length+1),
      username:username,
      password:password,
      name:name,
      position:position,
      centerID:centerID,
    };
    this.users.push(user);
  }

  getTests(){
    return this.tests;
  }

  addTest(patientID:string, type:string, symptom:string, officerID:string){
    const test: model.Test = {testID:(this.getTests().length+1).toString(), patientID:patientID, type:type, symptom:symptom,
      officerID:officerID, testCreated: new Date().toString(), status: 'Pending'}
    this.tests.push(test);
  }

  getTestByID(id:string){
    return this.tests.filter(s => s.testID == id);
  }

  getPatientTest(){
    let patients = this.getPatients();
    let tests = this.getTests();
    let patientTest = [];
    let i;

    for(i=0; i < tests.length; i++){
      let pName = patients.find(x => x.userID.toString() == tests[i].patientID).name;
      patientTest.push({testID:tests[i].testID, name:pName, type:tests[i].type,
        symptom:tests[i].symptom, testCreated:tests[i].testCreated, status:tests[i].status})
    }
    return patientTest;
    // return this.getTests().map((item, i) => Object.apply({}, item, this.getPatients()[i]));
  }
}
