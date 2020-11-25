import { Iproduct, IproductShop } from '@Service/interfaces/product.interface';
import { ICart } from './../../../../@core/interfaces/shop.car.interface';
import { Component, OnInit } from '@angular/core';
import { CartService } from '@shop/core/service/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart: ICart;
  constructor(private carservice: CartService, private router: Router) {
    this.carservice.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cart = data;
      }
    });
  }

  async ngOnInit() {
    this.cart = this.carservice.initialize();
  }
  // Cambio los valores de la cantidad
  changeValue(qty: number, product: IproductShop) {
    this.manageProductUnitiInfo(qty, product);
  }

  // metodo para informar al sevicio que un producto cambio
  manageProductUnitiInfo(qty: number, producto: IproductShop) {
    producto.prod_qty = qty;
    this.carservice.manageProduct(producto);
  }

  // Limpiar el carrito de compras
  clear() {
    this.carservice.clear();
  }
  // Cerrar la pestaña de carrito de compras
  closeNav() {
    this.carservice.closeNav();
  }
  // Eliminar un item
  clearItem(product) {
    this.manageProductUnitiInfo(0, product);
  }
  // Sumar productos
  plus(product: IproductShop) {
    product.prod_qty += 1;
    this.carservice.manageProduct(product);
  }
  // Disminuir productos
  minus(product: IproductShop) {
    product.prod_qty -= 1;
    this.carservice.manageProduct(product);
  }
  // procesar compra
  proccess() {
    this.router.navigate(['/checkout']);
    this.closeNav();
  }
}
