import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  urlbase = environment.urlbase;
  urlsubCategory = environment.subCategory;
  urlfilter = environment.filter;

  constructor(private http: HttpClient) {}

  getSubCategoryByFilter(filter: any) {
    return this.http
      .post(`${this.urlbase}${this.urlsubCategory}${this.urlfilter}`, filter)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  createSubCategory(body: any) {
    return this.http.post(`${this.urlbase}${this.urlsubCategory}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateCategory(id: number, body: any) {
    return this.http
      .put(`${this.urlbase}${this.urlsubCategory}/${id}`, body)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteCategory(id: number) {
    return this.http.delete(`${this.urlbase}${this.urlsubCategory}/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
