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
import {
  IProductByColors,
  IResponseDataProductByColors,
} from '@Service/interfaces/product_color.interface';
import {
  IProductBySize,
  IResponseDataProductBySize,
} from '@Service/interfaces/produc_size.interface';
import { SizeProductService } from '@Service/services/sizes-product/size-product.service';
import { ColorProductService } from '@Service/services/color-product/color-product.service';
import { IColor } from '@Service/interfaces/colors.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productDetail: IproductShop;
  idProduct: number;
  urlupload = environment.urlImages;
  listSize: Partial<IProductBySize>[];
  listColor: Partial<IColor>[];
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private carservice: CartService,
    private productSize: SizeProductService,
    private productColor: ColorProductService
  ) {
    this.listSize = [];
    this.listColor = [];
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        console.log('Este es el id', res.id);
        this.idProduct = res.id;
        this.getProduct();
        this.getProductColor(res.id);
        this.getProductSize(res.id);
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
            col_id: 0,
            size_id: 0,
            sca_id: element.sca_id,
            prod_image: element.prod_image,
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
  // Obtener las tallas asignadas a este producto
  getProductSize(id) {
    const filter = {
      filter: {
        prod_id: id,
        is_valid: 1,
      },
      limit: 10,
    };
    this.productSize.getFilter(filter).subscribe(
      (data: IResponseDataProductBySize) => {
        if (data.error) {
          basicAlert(
            'Tallas',
            'Error Al Obtener Lista',
            'Aceptar',
            Types_Alert.ERROR
          );
        } else {
          this.poblateTableProductBySize(data);
        }
      },
      (err) => {
        basicAlert(
          'Tallas',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.ERROR
        );
      }
    );
  }
  // Obtener los colores asignados a este producto
  getProductColor(id) {
    const filter = {
      filter: {
        prod_id: id,
        is_valid: 1,
      },
      limit: 10,
    };
    this.productColor.getFilter(filter).subscribe(
      (data: IResponseDataProductByColors) => {
        if (data.error) {
          basicAlert(
            'Color',
            'Error Al Obtener Lista',
            'Aceptar',
            Types_Alert.ERROR
          );
        } else {
          this.poblateTableProductByColor(data);
        }
      },
      (err) => {
        console.log(err);
        basicAlert(
          'Color',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.ERROR
        );
      }
    );
  }
  // Poblar la tabla de tallas por producto
  poblateTableProductBySize(data: IResponseDataProductBySize) {
    data.body.rows.forEach((element: IProductBySize) => {
      this.listSize.push({
        product_size_id: element.relationship_product_size.size_id,
        size_name: element.relationship_product_size.size_name,
      });
    });
  }
  // Poblar la tabla de tallas por producto
  poblateTableProductByColor(data: IResponseDataProductByColors) {
    data.body.rows.forEach((element: IProductByColors) => {
      this.listColor.push({
        col_id: element.relationship_product_color.col_id,
        col_name: element.relationship_product_color.col_name,
      });
    });
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

  onOptionSize(data: any) {
    this.productDetail.size_id = data;
  }
  onOptionsColor(data: any) {
    this.productDetail.col_id = data;
  }
}
