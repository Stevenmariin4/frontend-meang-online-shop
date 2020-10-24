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

  createPromotion(body: any) {
    return this.http.post(`${this.urlbase}${this.urlpromotion}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  UpdatePromotion(id: number, body: any) {
    return this.http
      .put(`${this.urlbase}${this.urlpromotion}/${id}`, body)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deletePromotion(id: any) {
    return this.http.delete(`${this.urlbase}${this.urlpromotion}/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
