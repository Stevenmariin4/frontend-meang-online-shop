import { FactureService } from './../../../../../@core/services/facture/facture.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  IFacture,
  IFactureDetail,
  IResponseFacture,
  IResponseFactuteData,
  IResponseFactuteDetailData,
} from '@Service/interfaces/facture.interface';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';
import { IResponseData } from '@Service/interfaces/product.interface';
import { ITable } from '@Service/interfaces/table.interface';

@Component({
  selector: 'app-view-factures',
  templateUrl: './view-factures.component.html',
  styleUrls: ['./view-factures.component.scss'],
})
export class ViewFacturesComponent implements OnInit {
  label: String;
  formFacture: Partial<IFacture>;
  idFacture;
  tableFactureDetails: ITable;
  constructor(
    private activeRoute: ActivatedRoute,
    private factureService: FactureService
  ) {
    this.tableFactureDetails = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'prod_name',
          nameToShow: 'Nombre',
          sort: 'asc',
          inputType: 'text',
        },

        {
          propertyName: 'prod_qty',
          nameToShow: 'Cantidad',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'prod_code',
          nameToShow: 'Codigo Producto',
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

  async ngOnInit() {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        this.idFacture = res.id;
        this.label = 'Actualizar Factura';
        await this.getFacture(res.id);
      } else {
        this.label = 'Crear Factura';
      }
    });
  }

  async getFacture(id) {
    const filter = {
      filter: {
        is_valid: 1,
        fac_id: id,
      },
    };
    this.factureService.getFactureFilter(filter).subscribe(
      (data: IResponseFactuteData) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Factura',
          'Error Al Obtener',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }

  async getFactureDetail(id) {
    const filter = {
      filter: {
        fac_id: id,
      },
    };
    this.factureService.getFactureDetailFilter(filter).subscribe(
      (data: IResponseFactuteDetailData) => {
        this.poblateTableFactureDetails(data);
      },
      (err) => {
        basicAlert(
          'Factura',
          'Error Al Obtener',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }
  poblateTableProduct(data: IResponseFactuteData) {
    data.body.rows.forEach((element) => {
      this.getFactureDetail(element.fac_id);
      this.formFacture = {
        fac_id: element.fac_id,
        fa_code: element.fa_code || 'No Contiene',
        use_name: element.use_name || 'No Contiene',
        use_lastname: element.use_lastname || 'No Contiene',
        use_email: element.use_email || 'No Contiene',
        use_phone: element.use_phone || 'No Contiene',
        use_address: element.use_address || 'No Contiene',
        use_city: element.use_city || 'No Contiene',
        use_street: element.use_street || 'No Contiene',
        use_home: element.use_home || 'No Contiene',
        fac_description: element.fac_description || 'No Contiene',
        fac_promo_code: element.fac_promo_code || 'No Contiene',
        fac_total: element.fac_total || 'No Contiene',
        fac_status:
          element.relationship_facture_status.fac_status_name || 'No Contiene',
      };
    });
  }
  poblateTableFactureDetails(data: IResponseFactuteDetailData) {
    this.tableFactureDetails.table_body = [];
    data.body.rows.forEach((element: IFactureDetail) => {
      this.tableFactureDetails.table_body.push({
        id: element.relationship_facture_product.prod_id,
        prod_code: element.relationship_facture_product.prod_id,
        prod_qty: element.prod_qty,
        prod_name: element.relationship_facture_product.prod_name,
        inputEditable: false,
        actions: [{ show: true, action: 'view', icon: 'far fa-eye' }],
      });
    });
    this.tableFactureDetails.totalData = data.body.count;
  }
}
