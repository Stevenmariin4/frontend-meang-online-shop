import { Subject } from 'rxjs';
import { ICart } from './../../../../@core/interfaces/shop.car.interface';
import { Injectable } from '@angular/core';
import { Iproduct, IproductShop } from '@Service/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Array<IproductShop> = [];
  cart: ICart = {
    subtotal: 0,
    total: 0,
    product: this.products,
  };
  // Gestionar Productos Con Notificaciones
  public itemsVar = new Subject<ICart>();
  public itemsVar$ = this.itemsVar.asObservable();
  constructor() {}
  // Inicializar el carrito de compras
  initialize() {
    const storeData = JSON.parse(localStorage.getItem('cart'));
    if (storeData !== null) {
      this.cart = storeData;
      return this.cart;
    } else {
      return this.cart;
    }
  }
  public updateItemsInCart(newValue: ICart) {
    this.itemsVar.next(newValue);
  }
  manageProduct(product: IproductShop) {
    const productTotal = this.cart.product.length;
    if (productTotal === 0) {
      this.cart.product.push(product);
    } else {
      let actionUpdateOk = false;
      for (let index = 0; index < productTotal; index++) {
        // Validando Existencia
        if (product.prod_id === this.cart.product[index].prod_id) {
          console.log('Producto Existente');
          if (product.prod_qty === 0) {
            console.log('Borrar Item Selecionado');
            // Eliminando Producto
            this.cart.product.splice(index, 1);
          } else {
            // Acutalizando Producto
            this.cart.product[index] = product;
          }
          actionUpdateOk = true;
          index = productTotal;
        }
      }
      if (!actionUpdateOk) {
        this.cart.product.push(product);
      }
    }
    this.checkoutTotal();
  }

  // Añadir la informacion de total y sub total
  checkoutTotal() {
    let subtotal = 0;
    let total = 0;
    this.cart.product.map((product: IproductShop) => {
      subtotal += product.prod_qty;
      total += product.prod_qty * product.prod_price_exit;
    });
    this.cart.total = total;
    this.cart.subtotal = subtotal;
    this.setInfo();
  }
  //vaciar carrito
  clear() {
    this.products = [];
    this.cart = {
      subtotal: 0,
      total: 0,
      product: this.products,
    };
    this.setInfo();
    return this.cart;
  }

  private setInfo() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateItemsInCart(this.cart);
  }

  openNav() {
    console.log('open nav');
    document.getElementById('mySidenav').style.width = '23em';
    document.getElementById('mySidenav').classList.add('nav-active');
  }
  closeNav() {
    console.log('close nav');
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('mySidenav').classList.remove('nav-active');
  }
}
