import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  urlbase = environment.urlbase;
  urluploads = environment.uploads;
  urlfilter = environment.filter;

  constructor(private http: HttpClient) {}

  uploadFile(formdata) {
    return this.http.post(`${this.urlbase}${this.urluploads}`, formdata).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
