import { Component, OnInit } from '@angular/core';
import { IResponseData } from '@Service/interfaces/product.interface';
import { ITable } from '@Service/interfaces/table.interface';
import { ProductsService } from '@Service/services/product/products.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  tableProduct: ITable;
  constructor(private serviceProduct: ProductsService) {
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
    };
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.poblateTableProduct(data);
      },
      (err) => {}
    );
  }

  poblateTableProduct(data: IResponseData) {
    data.body.rows.forEach((element) => {
      this.tableProduct.table_body.push({
        pro_id: element.pro_id,
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
}
