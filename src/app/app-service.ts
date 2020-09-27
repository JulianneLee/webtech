import * as model from './app-model';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class AppService {
  private managers: model.Manager[] = [];
  private patients: model.Patient[] = [];
  private tests: model.Test[] = [];
  private patientTests: model.PatientTest[] = [];

  getManagers(){
    return this.managers;
  }

  addManager(username:string, password:string, name:string){
    const manager: model.Manager = {username:username, password:password, name:name, position:'Manager'};
    this.managers.push(manager);
  }

  getPatients(){
    return this.patients;
  }

  addPatient(username:string, password:string, name:string){
    const patient: model.Patient = {patientID:(this.getPatients().length+1).toString(), username:username, password:password, name:name};
    this.patients.push(patient);
  }

  getTests(){
    return this.tests;
  }

  addTest(patientID:string, type:string, symptom:string, officerID:string, testCreated: string){
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
      let pName = patients.find(x => x.patientID == tests[i].patientID).name;
      patientTest.push({testID:tests[i].testID, name:pName, type:tests[i].type,
        symptom:tests[i].symptom, testCreated:tests[i].testCreated, status:tests[i].status})
    }
    return patientTest;
    // return this.getTests().map((item, i) => Object.apply({}, item, this.getPatients()[i]));
  }
}
