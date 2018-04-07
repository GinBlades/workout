import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {
  public apiHost = environment.apiHost;

  private authenticatedSource = new BehaviorSubject<string>("");
  public authenticated$ = this.authenticatedSource.asObservable();

  constructor(private http: HttpClient) { }

  login(token: string) {
    localStorage.setItem("authToken", token);
    this.http.get(`${this.apiHost}/users/auth/${token}`).subscribe(data => {
      this.authenticatedSource.next((<any>data).email);
    })
  }

  authToken() {
    return localStorage.getItem("authToken");
  }

  headerOptions() {
    if (!this.authToken()) {
      return { };
    }

    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authToken()}`
      })
    };
  }
}
