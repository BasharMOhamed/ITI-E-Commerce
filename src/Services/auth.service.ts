import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4100/api/users/auth'; // Update to your backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log({ email, password });
    return this.http.post<any>(this.apiUrl, { email, password });
  }
}
