import { Router } from '@angular/router';
import { FactureService } from './../../../../../@core/services/facture/facture.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import {
  IFacture,
  IFactureResponse,
} from '@Service/interfaces/facture.interface';
import { ICart } from '@Service/interfaces/shop.car.interface';
import { CartService } from '@shop/core/service/cart/cart.service';
import { IFactureDetails } from '@Service/interfaces/facture_detail.interface';
import { IproductShop } from '@Service/interfaces/product.interface';
import { basicAlert, ModalAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: ICart;
  facture: Partial<IFacture> = {
    use_name: '',
    use_lastname: '',
    use_email: '',
    use_phone: '',
    use_address: '',
    use_city: '',
    use_street: '',
    use_home: '',
    fac_description: '',
    fac_promo_code: '',
    fac_total: '',
    is_valid: 1,
    fac_status_id: environment.statusDefault,
  };
  constructor(
    private carservice: CartService,
    private factureService: FactureService,
    private router: Router
  ) {
    this.carservice.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cart = data;
      }
    });
  }

  ngOnInit() {
    this.cart = this.carservice.initialize();
    console.log(this.cart);
  }

  async createFacture() {
    if (this.cart.product.length === 0) {
      basicAlert(
        'Factura',
        'Debe Seleccionar un producto para poder comprar',
        'Aceptar',
        Types_Alert.WARNING
      );
    } else {
      this.facture.fa_code = await this.createGuid();
      this.facture.fac_total = await this.cart.total.toString();
      const factureDetails: Partial<IFactureDetails>[] = [];

      this.factureService.createFacture(this.facture).subscribe(
        (data: IFactureResponse) => {
          if (!data.error) {
            this.cart.product.forEach((element: IproductShop) => {
              factureDetails.push({
                fac_product_id: element.prod_id,
                prod_qty: element.prod_qty,
                is_valid: 1,
                fac_id: data.body,
              });
            });
            this.factureService
              .createFactureDetails(factureDetails)
              .subscribe((datas: IFactureResponse) => {
                if (!datas.error) {
                  ModalAlert(
                    'Factura',
                    'Creada Correctamente El Codigo De Consulta Del Pedido Es  ' +
                      this.facture.fa_code,
                    'Aceptar',
                    Types_Alert.SUCCESS
                  );
                  this.carservice.clear();
                  this.facture = {}
                } else {
                  basicAlert(
                    'Factura',
                    'Error Al Crear Correctamente',
                    'Aceptar',
                    Types_Alert.ERROR
                  );
                }
              });
          } else {
            basicAlert(
              'Factura',
              'Error Al Crear Correctamente',
              'Aceptar',
              Types_Alert.ERROR
            );
          }
        },
        (err) => {
          console.log(err);
          basicAlert(
            'Factura',
            'Error Al Crear Correctamente',
            'Aceptar',
            Types_Alert.ERROR
          );
        }
      );
    }
  }

  createGuid() {
    return 'xxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line: one-variable-per-declaration
      const r = (Math.random() * 16) | 0,
        // tslint:disable-next-line: no-bitwise
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
