import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponseData } from '@Service/interfaces/product.interface';
import { ITable } from '@Service/interfaces/table.interface';
import { ProductsService } from '@Service/services/product/products.service';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  tableProduct: ITable;
  sortColumn;
  filterApplied;
  pageNumber = 0;
  pageSize = 10;

  constructor(private serviceProduct: ProductsService, private router: Router) {
    this.tableProduct = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'prod_name',
          nameToShow: 'Nombre',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'prod_description',
          nameToShow: 'Descripción',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'prod_stock',
          nameToShow: 'Disponibilidad',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'prod_price_exit',
          nameToShow: 'Precio Venta',
          sort: 'asc',
          inputType: 'text',
        },
        { propertyName: 'actions', nameToShow: 'Acciones', sort: null },
      ],
      table_body: [],
      pageSize: 10,
      totalData: 30,
      numOfPages: 4,
      currentPage: 1,
    };
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 10,
      page: 0,
    };
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Productos',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }

  poblateTableProduct(data: IResponseData) {
    this.tableProduct.table_body = [];
    data.body.rows.forEach((element) => {
      this.tableProduct.table_body.push({
        id: element.prod_id,
        prod_name: element.prod_name,
        prod_description: element.prod_description,
        prod_stock: element.prod_stock,
        prod_price_exit: element.prod_price_exit,
        inputEditable: false,
        actions: [
          { show: true, action: 'edit', icon: 'fas fa-pencil-alt' },
          { show: true, action: 'delete', icon: 'fas fa-trash' },
        ],
      });
    });
    this.tableProduct.totalData = data.body.count;
  }

  redirectCreate(id: any) {
    if (id !== 0) {
      this.router.navigate(['/admin/product/update/', id]);
    } else {
      this.router.navigate(['/admin/product/create']);
    }
  }
  async actionHandler(action: any) {
    switch (action.action) {
      case 'edit':
        this.router.navigate([`/admin/product/update/${action.idItem}`]);
        break;
      case 'delete':
        //this.deleteCategory(action.idItem);
        break;
      default:
        break;
    }
  }
  pageChanger(page: any) {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: page.pageSize,
      page: page.page,
    };
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Productos',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }
  filterTable(toSearch: any) {
    const filter = {
      filter: {
        is_valid: 1,
        prod_name: toSearch.fieldToSearch,
      },
    };
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Productos',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }
}
