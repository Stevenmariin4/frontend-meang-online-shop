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

  createCategory(body: any) {
    return this.http.post(`${this.urlbase}${this.urlCategory}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  UpdateCategory(id: number, body: any) {
    return this.http.put(`${this.urlbase}${this.urlCategory}/${id}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteCategory(id) {
    return this.http.delete(`${this.urlbase}${this.urlCategory}/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
