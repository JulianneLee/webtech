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
    return this.patientTests;
  }

  addPatientTest(patientID: string, testID: string, username: string, password: string, name: string, type: string,
    symptom: string, officerID: string, testCreated: string, status:string){
      // let arr3 = this.getPatients().map((item, i) => Object.assign({}, item, this.getTestByID[i])));
      const patientTest: model.PatientTest = {patientID:patientID, testID:testID, username:username, password:password, name:name,
        type:type, symptom:symptom, officerID:officerID, testCreated:testCreated, status:status}
      this.patientTests.push(patientTest);
  }
}










