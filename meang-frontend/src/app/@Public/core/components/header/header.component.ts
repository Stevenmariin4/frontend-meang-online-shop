import { CartService } from './../../service/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '@Service/services/auth/auth-service.service';
import { LoginService } from '@Service/services/login/login.service';
import { basicAlert } from 'src/app/@Shared/toast';
import { Types_Alert } from 'src/app/@Shared/values.config';
import { ICart } from '@Service/interfaces/shop.car.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart: ICart;
  constructor(
    public authSessio: AuthServiceService,
    private login: LoginService,
    private carservice: CartService
  ) {
    this.carservice.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cart = data;
      }
    });
  }

  ngOnInit(): void {
    this.cart = this.carservice.initialize();
  }
  logOut() {
    this.login.logout().subscribe((data) => {
      if (!data.error) {
        basicAlert(
          'Inicio Sesion',
          'Se Ha Finalizado Correctamente',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        localStorage.removeItem('session');
      }
    });
  }
  open() {
    this.carservice.openNav();
  }
}
