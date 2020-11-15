import { Iproduct, IproductShop } from '@Service/interfaces/product.interface';
import { ICart } from './../../../../@core/interfaces/shop.car.interface';
import { Component, OnInit } from '@angular/core';
import { CartService } from '@shop/core/service/cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart: ICart;
  constructor(private carservice: CartService) {
    this.carservice.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cart = data;
      }
    });
  }

  async ngOnInit() {
    this.cart = this.carservice.initialize();
  }
  changeValue(qty: number, product: IproductShop) {
    this.manageProductUnitiInfo(qty, product);
  }
  manageProductUnitiInfo(qty: number, producto: IproductShop) {
    producto.prod_qty = qty;
    this.carservice.manageProduct(producto);
  }
  clear() {
    this.carservice.clear();
  }
  closeNav() {
    this.carservice.closeNav();
  }
  clearItem(product) {
    this.manageProductUnitiInfo(0, product);
  }
  plus(product: IproductShop) {
    product.prod_qty += 1;
    this.carservice.manageProduct(product);
  }
  minus(product: IproductShop) {
    product.prod_qty -= 1;
    this.carservice.manageProduct(product);
  }
}
