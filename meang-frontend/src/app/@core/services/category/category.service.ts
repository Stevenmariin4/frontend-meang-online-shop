import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  urlbase = environment.urlbase;
  urlCategory = environment.Category;
  urlfilter = environment.filter;
  constructor(private http: HttpClient) {}

  getCategoryByFilter(filter: any) {
    return this.http
      .post(`${this.urlbase}${this.urlCategory}${this.urlfilter}`, filter)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
