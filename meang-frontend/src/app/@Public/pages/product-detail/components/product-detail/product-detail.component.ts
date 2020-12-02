import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Iproduct,
  IproductShop,
  IResponseData,
} from '@Service/interfaces/product.interface';
import { ProductsService } from '@Service/services/product/products.service';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';
import { CartService } from '@shop/core/service/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productDetail: IproductShop;
  idProduct: number;
  urlupload = environment.urlImages;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private carservice: CartService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        console.log('Este es el id', res.id);
        this.idProduct = res.id;
        this.getProduct();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  getProduct() {
    const filter = {
      filter: {
        is_valid: 1,
        prod_id: this.idProduct,
      },
      limit: 16,
    };
    this.productService.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        data.body.rows.forEach((element) => {
          this.productDetail = {
            prod_id: element.prod_id,
            prod_name: element.prod_name,
            prod_description: element.prod_description,
            prod_price: element.prod_price,
            prod_discount_price: element.prod_discount_price,
            prod_discount: element.prod_discount,
            prod_price_exit: element.prod_price_exit,
            prod_stock: element.prod_stock,
            prod_qty: 0,
            prod_image:  element.prod_image,
          };
        });
      },
      (err) => {
        basicAlert(
          'Productos',
          'Error Al Listar Producto',
          'Aceptar',
          Types_Alert.ERROR
        );
        console.log(err);
      }
    );
  }
  plus(product: IproductShop) {
    product.prod_qty += 1;
    this.carservice.manageProduct(product);
  }
  minus(product: IproductShop) {
    product.prod_qty -= 1;
    this.carservice.manageProduct(product);
  }
  addCart(data: IproductShop) {
    if (!data.prod_qty) {
      data.prod_qty = 1;
    }
    this.carservice.manageProduct(data);
  }
}
