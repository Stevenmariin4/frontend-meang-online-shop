import { Router } from '@angular/router';
import { FactureService } from './../../../../../@core/services/facture/facture.service';
import { Component, OnInit } from '@angular/core';
import { ITable } from '@Service/interfaces/table.interface';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';
import { IResponseData } from '@Service/interfaces/product.interface';
import { IResponseFactuteData } from '@Service/interfaces/facture.interface';

@Component({
  selector: 'app-list-factures',
  templateUrl: './list-factures.component.html',
  styleUrls: ['./list-factures.component.scss'],
})
export class ListFacturesComponent implements OnInit {
  tableFacture: ITable;
  sortColumn;
  filterApplied;
  pageNumber = 0;
  pageSize = 10;
  constructor(private factureService: FactureService, private router: Router) {
    this.tableFacture = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'fa_code',
          nameToShow: 'Codigo',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'fac_status',
          nameToShow: 'Estado',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'fac_total',
          nameToShow: 'Total',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'use_name',
          nameToShow: 'Usuario',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'use_email',
          nameToShow: 'Correo',
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

  ngOnInit() {
    this.getFacture();
  }

  getFacture() {
    const filter = {
      filter: {
        is_valid: 1,
      },
    };
    this.factureService.getFactureFilter(filter).subscribe(
      (data: IResponseFactuteData) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Factura',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }

  async actionHandler(action: any) {
    switch (action.action) {
      case 'view':
        this.router.navigate([`admin/factures/view/${action.idItem}`]);
        break;
      case 'delete':
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
    this.factureService.getFactureFilter(filter).subscribe(
      (data: IResponseFactuteData) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Factura',
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
      },
    };
    this.factureService.getFactureFilter(filter).subscribe(
      (data: IResponseFactuteData) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Factura',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }
  poblateTableProduct(data: IResponseFactuteData) {
    this.tableFacture.table_body = [];
    data.body.rows.forEach((element) => {
      this.tableFacture.table_body.push({
        id: element.fac_id,
        fa_code: element.fa_code,
        fac_total: element.fac_total,
        use_name: element.use_name,
        use_email: element.use_email,
        fac_status: element.relationship_facture_status.fac_status_name,
        inputEditable: false,
        actions: [{ show: true, action: 'view', icon: 'far fa-eye' }],
      });
    });
    this.tableFacture.totalData = data.body.count;
  }
}
