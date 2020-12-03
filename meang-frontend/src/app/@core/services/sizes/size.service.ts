import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  urlbase = environment.urlbase;
  urlsize = environment.size;
  urlfilter = environment.filter;

  constructor(private http: HttpClient) {}

  getFilter(filter: any) {
    return this.http
      .post(`${this.urlbase}${this.urlsize}${this.urlfilter}`, filter)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  create(body: any) {
    return this.http.post(`${this.urlbase}${this.urlsize}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: number, body: any) {
    return this.http.put(`${this.urlbase}${this.urlsize}/${id}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleted(id) {
    return this.http.delete(`${this.urlbase}${this.urlsize}/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
