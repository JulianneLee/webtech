import { Manager, Patient } from './app-model';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class AppService {
  private managers: Manager[] = [];
  private patients: Patient[] = [];

  getManagers(){
    return this.managers;
  }

  addManager(username:string, password:string, name:string){
    const manager: Manager = {username:username, password:password, name:name, position:'Manager'};
    this.managers.push(manager);
  }

  getPatients(){
    return this.patients;
  }

  addPatient(username:string, password:string, name:string){
    const patient: Patient = {username:username, password:password, name:name};
    this.patients.push(patient);
  }
}
