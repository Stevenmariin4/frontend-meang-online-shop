import { CartService } from '@shop/core/service/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { IproductShop } from '@Service/interfaces/product.interface';

@Component({
  selector: 'app-qty-selector',
  templateUrl: './qty-selector.component.html',
  styleUrls: ['./qty-selector.component.scss'],
})
export class QtySelectorComponent implements OnInit {
  product
  constructor(private carservice: CartService) {}

  ngOnInit(): void {}

  plus(product: IproductShop) {
    product.prod_qty += 1;
    this.carservice.manageProduct(product);
  };
  minus(product: IproductShop) {
    product.prod_qty -= 1;
    this.carservice.manageProduct(product);
  }
}
