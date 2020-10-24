import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponseDataPromotions } from '@Service/interfaces/promotions.interface';
import { ITable } from '@Service/interfaces/table.interface';
import { PromotionsService } from '@Service/services/promotions/promotions.service';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-list-promotions',
  templateUrl: './list-promotions.component.html',
  styleUrls: ['./list-promotions.component.scss'],
})
export class ListPromotionsComponent implements OnInit {
  tablePromotions: ITable;
  sortColumn;
  filterApplied;
  pageNumber = 0;
  pageSize = 10;
  constructor(
    private promotionsService: PromotionsService,
    private router: Router
  ) {
    this.tablePromotions = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'pro_name',
          nameToShow: 'Nombre',
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
    this.getPromotions();
  }

  getPromotions() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 10,
      page: 0,
    };
    this.promotionsService.getPromotionByFilter(filter).subscribe(
      (data: IResponseDataPromotions) => {
        this.poblateTable(data);
      },
      (err) => {}
    );
  }

  poblateTable(data: IResponseDataPromotions) {
    this.tablePromotions.table_body = [];
    data.body.rows.forEach((element) => {
      this.tablePromotions.table_body.push({
        id: element.pro_id,
        pro_name: element.pro_name,
        inputEditable: false,
        actions: [{ show: true, action: 'edit', icon: 'fas fa-pencil-alt' }],
      });
    });
    this.tablePromotions.totalData = data.body.count;
  }
  redirectCreate(id: any) {
    if (id !== 0) {
      this.router.navigate(['/admin/promotions/update/', id]);
    } else {
      this.router.navigate(['/admin/promotions/create']);
    }
  }
  async actionHandler(action: any) {
    switch (action.action) {
      case 'edit':
        this.router.navigate([`/admin/promotions/update/${action.idItem}`]);
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
    this.promotionsService.getPromotionByFilter(filter).subscribe(
      (data: IResponseDataPromotions) => {
        this.poblateTable(data);
      },
      (err) => {
        basicAlert(
          'Promociones',
          'Error Al Obtener',
          'Aceptar',
          Types_Alert.ERROR
        );
        console.log(err);
      }
    );
  }
}
