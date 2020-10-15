import { ColorService } from './../../../../../@core/services/colors/color.service';
import { Component, OnInit } from '@angular/core';
import { ITable } from '@Service/interfaces/table.interface';
import { IResponseDataColors } from '@Service/interfaces/colors.interface';

@Component({
  selector: 'app-list-colors',
  templateUrl: './list-colors.component.html',
  styleUrls: ['./list-colors.component.scss'],
})
export class ListColorsComponent implements OnInit {
  tableColors: ITable;
  constructor(private serviceColor: ColorService) {
    this.tableColors = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'col_name',
          nameToShow: 'Nombre',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'col_description',
          nameToShow: 'Descripción',
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
    this.getColors();
  }

  getColors() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 10,
    };
    this.serviceColor.getColorFilter(filter).subscribe(
      (data: IResponseDataColors) => {
        this.poblateTableProduct(data);
      },
      (err) => {}
    );
  }

  poblateTableProduct(data: IResponseDataColors) {
    data.body.rows.forEach((element) => {
      this.tableColors.table_body.push({
        col_id: element.col_id,
        col_name: element.col_name,
        col_description: element.col_description,
        inputEditable: false,
        actions: [
          { show: true, action: 'edit', icon: 'fas fa-pencil-alt' },
          { show: true, action: 'delete', icon: 'fas fa-trash' },
        ],
      });
    });
    this.tableColors.totalData = data.body.count;
  }
}
