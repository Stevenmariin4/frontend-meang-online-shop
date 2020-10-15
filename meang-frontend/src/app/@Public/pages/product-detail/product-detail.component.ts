import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        console.log('Este es el id', res.id);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
