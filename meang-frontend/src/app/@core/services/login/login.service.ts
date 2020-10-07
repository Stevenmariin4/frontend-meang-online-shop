import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ILoginResponse } from '@Service/interfaces/login.interfaces';
import { Observable } from 'rxjs';
import { ISession } from '@Service/interfaces/session.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlbase: string = environment.urlbase;
  urlLlogin: string = environment.login;
  constructor(private http: HttpClient) {}

  public sigin(body): Observable<ILoginResponse> {
    return this.http.post(`${this.urlbase}${this.urlLlogin}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  public logout(): Observable<ILoginResponse> {
    const token = localStorage.getItem('session') as ISession;
    return this.http
      .get(`${this.urlbase}${this.urlLlogin}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
