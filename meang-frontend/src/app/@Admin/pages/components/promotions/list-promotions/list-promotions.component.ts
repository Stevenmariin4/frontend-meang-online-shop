import { Component, OnInit } from '@angular/core';
import { IResponseDataPromotions } from '@Service/interfaces/promotions.interface';
import { ITable } from '@Service/interfaces/table.interface';
import { PromotionsService } from '@Service/services/promotions/promotions.service';

@Component({
  selector: 'app-list-promotions',
  templateUrl: './list-promotions.component.html',
  styleUrls: ['./list-promotions.component.scss'],
})
export class ListPromotionsComponent implements OnInit {
  tablePromotions: ITable;
  constructor(private promotionsService: PromotionsService) {
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
    };
    this.promotionsService.getPromotionByFilter(filter).subscribe(
      (data: IResponseDataPromotions) => {
        this.poblateTable(data);
      },
      (err) => {}
    );
  }

  poblateTable(data: IResponseDataPromotions) {
    data.body.rows.forEach((element) => {
      this.tablePromotions.table_body.push({
        pro_id: element.pro_id,
        pro_name: element.pro_name,
        inputEditable: false,
        actions: [
          { show: true, action: 'edit', icon: 'fas fa-pencil-alt' },
          { show: true, action: 'delete', icon: 'fas fa-trash' },
        ],
      });
    });
    this.tablePromotions.totalData = data.body.count;
  }
}
