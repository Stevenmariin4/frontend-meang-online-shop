import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromotionsService {
  urlbase = environment.urlbase;
  urlpromotion = environment.promotion;
  urlfilter = environment.filter;
  constructor(private http: HttpClient) {}

  getPromotionByFilter(filter: any) {
    return this.http
      .post(`${this.urlbase}${this.urlpromotion}${this.urlfilter}`, filter)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
