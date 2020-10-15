import { Component, OnInit } from '@angular/core';
import { Iproduct, IResponseData } from '@Service/interfaces/product.interface';
import {
  IResponseDataCategory,
  ISubCategory,
} from '@Service/interfaces/sub-categorys.interface';
import { ProductsService } from '@Service/services/product/products.service';
import { SubCategoryService } from '@Service/services/subCategory/sub-category.service';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Partial<Iproduct>[];
  SubCategory: Partial<ISubCategory>[];
  carrousel: any;

  constructor(
    private serviceProduct: ProductsService,
    private subCategoryService: SubCategoryService
  ) {
    this.products = [];
    this.SubCategory = [];
    this.carrousel = [
      {
        src: 'https://i.ytimg.com/vi/o-CnLaIp_sw/maxresdefault.jpg',
        name: 'Primera',
      },
      {
        src:
          'https://www.instyle.es/medio/2019/12/16/tendencias-de-moda_e19a2b54_1200x630.jpg',
        name: 'Primera',
      },
      {
        src:
          'https://carfra.com.ar/wp-content/uploads/2020/05/juvenil-moda-2020.jpg',
        name: 'Primera',
      },
    ];
  }

  async ngOnInit() {
    await this.getProduct();
    await this.getSubCategory();
  }
  getSubCategory() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 30,
    };
    this.subCategoryService.getSubCategoryByFilter(filter).subscribe(
      (data: IResponseDataCategory) => {
        this.SubCategory = [];

        data.body.rows.forEach((element) => {
          this.SubCategory.push({
            sca_id: element.sca_id,
            sca_name: element.sca_name,
          });
        });
      },
      (err) => {
        basicAlert(
          'Categorias',
          'Error Al Listar Categorias',
          'Aceptar',
          Types_Alert.ERROR
        );
      }
    );
  }
  getProduct() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 16,
    };
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.products = [];
        this.poblatetableproduct(data.body.rows);
      },
      (err) => {
        basicAlert(
          'Productos',
          'Error Al Listar Productos',
          'Aceptar',
          Types_Alert.ERROR
        );
        console.log(err);
      }
    );
  }
  getProductbySubcategory(id: number) {
    const filter = {
      filter: {
        is_valid: 1,
        sca_id: id,
      },
      limit: 16,
    };
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.products = [];
        this.poblatetableproduct(data.body.rows);
      },
      (err) => {
        basicAlert(
          'Productos',
          'Error Al Listar Productos',
          'Aceptar',
          Types_Alert.ERROR
        );
        console.log(err);
      }
    );
  }

  poblatetableproduct(data: Partial<Iproduct>[]) {
    data.forEach((element) => {
      this.products.push({
        prod_name: element.prod_name,
        prod_description: element.prod_description,
        prod_price_exit: element.prod_price_exit,
        prod_price: element.prod_price,
        prod_image: element.prod_image,
        prod_discount: element.prod_discount,
        is_last_product: element.is_last_product,
      });
    });
  }
}
