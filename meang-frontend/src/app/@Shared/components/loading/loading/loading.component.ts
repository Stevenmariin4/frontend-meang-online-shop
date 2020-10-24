import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@Service/services/loader/loader.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  mode = 'indeterminate';
  value = 50;

  loading: boolean;
  loadingSubscription: Subscription;

  // isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {
    this.loading = false;
  }

  ngOnInit() {
    this.loadingSubscription = this.loaderService.loadingStatus
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.loading = value;
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
