import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  urlbase = environment.urlbase;
  urlproduct = environment.product;
  urlfilter = environment.filter;

  constructor(private http: HttpClient) {}

  getProductFilter(filter: any) {
    return this.http
      .post(`${this.urlbase}${this.urlproduct}${this.urlfilter}`, filter)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
