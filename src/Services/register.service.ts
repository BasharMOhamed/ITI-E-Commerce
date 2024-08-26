import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  createUser(userRegisterObj:any):Observable<any>{
    return this.http.post<any>('http://localhost:4100/api/users/register', userRegisterObj);
  }
}
