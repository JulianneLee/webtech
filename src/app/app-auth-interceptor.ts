import {Injectable} from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler} from '@angular/common/http';
import { AppService } from './app-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private appService:AppService){}
  intercept(req: HttpRequest<any>, next:HttpHandler){
    const authToken = this.appService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization','Bearer ' + authToken)
    })
    return next.handle(authRequest)
  }
}
