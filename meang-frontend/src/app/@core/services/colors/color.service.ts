import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  urlbase = environment.urlbase;
  urlcolor = environment.colors;
  urlfilter = environment.filter;

  constructor(private http: HttpClient) {}

  getColorFilter(filter: any) {
    return this.http
      .post(`${this.urlbase}${this.urlcolor}${this.urlfilter}`, filter)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  createColor(body: any) {
    return this.http.post(`${this.urlbase}${this.urlcolor}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateColor(id: number, body: any) {
    return this.http.put(`${this.urlbase}${this.urlcolor}/${id}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deletedColor(id) {
    return this.http.delete(`${this.urlbase}${this.urlcolor}/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
