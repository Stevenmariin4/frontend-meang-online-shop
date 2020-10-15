import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
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
}
