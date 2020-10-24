import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Iproduct, IResponseData } from '@Service/interfaces/product.interface';
import { ProductsService } from '@Service/services/product/products.service';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productDetail: Partial<Iproduct>;
  idProduct: number;
  urlupload = environment.urlImages;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
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
            prod_image: this.urlupload + element.prod_image,
            is_last_product: element.is_last_product,
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
}
