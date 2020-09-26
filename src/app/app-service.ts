import {Manager} from './app-model';
import {Injectable} from '@angular/core';

@Injectable({providedIn:'root'})

export class AppService {
  private managers: Manager[] = [];

  getManagers(){
    return this.managers;
  }

  addManager(username:string, password:string, name:string){
    const manager: Manager = {username:username, password:password, name:name, position:'Manager'};
    this.managers.push(manager);
  }
}
