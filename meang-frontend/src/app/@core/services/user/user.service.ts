import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlbase: string = environment.urlbase;
  urluser: string = environment.user;
  urlFilter: string = environment.filter;
  constructor(private http: HttpClient) {}

  getUser(filter?: any, page?: number, pageSize?: number, order?: any) {
    this.http
      .post(`${this.urlbase}${this.urluser}${this.urlFilter}`, filter)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getMe() {}
  register(body) {
    this.http.post(`${this.urlbase}${this.urluser}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
