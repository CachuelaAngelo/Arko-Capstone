
import { regFormint } from '../models/regForm.mode';
import {CookieService} from 'ngx-cookie-service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { showroom } from 'src/app/shares/models/showroomint.model';



@Injectable({
  providedIn: 'root'
  })
  

export class ShowroomService{

 

  constructor(private http:HttpClient,
    private cookieService: CookieService){

}
  APIUrl = 'https://arko-ust.herokuapp.com/';
  readonly PhotoUrl = 'https://arko-ust.herokuapp.com/media/';
  //APIUrl = "http://127.0.0.1:8000/";
  //readonly PhotoUrl = "http://127.0.0.1:8000/media/";
  token = this.cookieService.get('mr-token');
  headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: "Token" + this.token
  });

  
  registerShowroom(authData: any){
    const body = JSON.stringify(authData);
    return this.http.post(this.APIUrl + 'Accounts/send_email/', body, {headers: this.headers});
  }

  regLogin(authData: any){
    const body = JSON.stringify(authData);
    return this.http.post(this.APIUrl + 'Accounts/auth/', body, {headers: this.headers});
}

getAuthHeaders(){
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });

  }

  GET_registrant(id:Number){
    return this.http.get<regFormint>(this.APIUrl + 'Accounts/showroom-registrants/' + id);
  }

  GET_registrants(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'Accounts/showroom-registrants/');
  }

  addShowroom(val: any){
    return this.http.post(this.APIUrl + 'backend/Showroom/',val, {headers: this.getAuthHeaders()});
  }

  UploadPhoto_Showroom(val:any){
    return this.http.post(this.APIUrl+'Showroom/SaveFile', val);
  }

  GET_showrooms(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'backend/Showroom/');
  }

  GET_showroom(id:Number){
    return this.http.get<showroom>(this.APIUrl + 'backend/Showroom/' + id);
  }

  EDIT_showroom(val:any){
    return this.http.put(this.APIUrl + 'backend/Showroom/',val);
  }

  DELETE_showroom(val:any){
    return this.http.delete(this.APIUrl + 'backend/Showroom/'+ val);
  }

}

  
 

