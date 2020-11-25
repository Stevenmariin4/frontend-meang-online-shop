import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  urlbase = environment.urlbase;
  urlfacture = environment.facture;
  urlfactureStatus = environment.factureStatus;
  urlfactureDetail = environment.factureDetail;
  urlfilter = environment.filter;
  constructor(private http: HttpClient) {}

  // Creacion de la factura
  getFactureFilter(filter: any) {
    return this.http
      .post(`${this.urlbase}${this.urlfacture}${this.urlfilter}`, filter)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  createFacture(body: any) {
    return this.http.post(`${this.urlbase}${this.urlfacture}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateFacture(id: number, body: any) {
    return this.http.put(`${this.urlbase}${this.urlfacture}/${id}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deletedFacture(id) {
    return this.http.delete(`${this.urlbase}${this.urlfacture}/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // Creacion del detalle de la factura
  getFactureDetailFilter(filter: any) {
    return this.http
      .post(`${this.urlbase}${this.urlfactureDetail}${this.urlfilter}`, filter)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  createFactureDetails(body: any) {
    return this.http.post(`${this.urlbase}${this.urlfactureDetail}`, body).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
