import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '@Service/services/loader/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  activeRequests: number;

  skipUrls: string[];

  constructor(public loaderService: LoaderService) {
    this.activeRequests = 0;
    this.skipUrls = [];
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let displayLoadingScreen = true;

    for (const url of this.skipUrls) {
      const reqUrl = req.url.split('/?');
      if (new RegExp(url).test(reqUrl[0])) {
        displayLoadingScreen = false;
        break;
      }
    }

    if (displayLoadingScreen) {
      if (this.activeRequests === 0) {
        this.loaderService.startLoading();
      }

      this.activeRequests++;
      return next.handle(req).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.loaderService.stopLoading();
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
