import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Iproduct, IResponseData } from '@Service/interfaces/product.interface';
import {
  IResponseDataSubCategory,
  ISubCategory,
} from '@Service/interfaces/sub-categorys.interface';
import { ProductsService } from '@Service/services/product/products.service';
import { SubCategoryService } from '@Service/services/subCategory/sub-category.service';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  products: Partial<Iproduct>[];
  SubCategory: Partial<ISubCategory>[];
  urlUpload = environment.urlImages;
  totaldata: number;
  pageIndex: number;
  pageSize: number;
  constructor(
    private serviceProduct: ProductsService,
    private subCategoryService: SubCategoryService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.products = [];
  }

  async ngOnInit() {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        const filter = {
          filter: {
            is_valid: 1,
            ca_id: res.id,
          },
          limit: 12,
        };
        this.getProduct(filter);
      } else {
        const filter = {
          filter: {
            is_valid: 1,
          },
          limit: 12,
        };
        this.getProduct(filter);
      }
    });
    await this.getSubCategory();
  }
  getProduct(filter: any) {
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.products = [];
        this.poblatetableproduct(data.body.rows);
        this.totaldata = data.body.count;
        this.pageSize = 12;
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
  getSubCategory() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 30,
    };
    this.subCategoryService.getSubCategoryByFilter(filter).subscribe(
      (data: IResponseDataSubCategory) => {
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
        prod_id: element.prod_id,
        prod_name: element.prod_name,
        prod_description: element.prod_description,
        prod_price_exit: element.prod_price_exit,
        prod_price: element.prod_price,
        prod_image: this.urlUpload + element.prod_image,
        prod_discount: element.prod_discount,
        is_last_product: element.is_last_product,
      });
    });
  }
  redirec(id: any) {
    this.router.navigate(['/product/detail/', id]);
  }
  goToPage(page) {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: page.pageSize,
      page: page.pageIndex,
    };
    this.getProduct(filter);
  }
}
