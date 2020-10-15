import { Component, OnInit } from '@angular/core';
import {
  IResponseCategory,
  IResponseDataCategorys,
} from '@Service/interfaces/category.interface';
import { ITable } from '@Service/interfaces/table.interface';
import { CategoryService } from '@Service/services/category/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements OnInit {
  tableCategory: ITable;
  constructor(private categoryService: CategoryService) {
    this.tableCategory = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'ca_name',
          nameToShow: 'Nombre',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'ca_description',
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
    this.getCategory();
  }

  getCategory() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 10,
    };
    this.categoryService.getCategoryByFilter(filter).subscribe(
      (data: IResponseDataCategorys) => {
        this.poblateTableCategory(data);
      },
      (err) => {}
    );
  }

  poblateTableCategory(data: IResponseDataCategorys) {
    data.body.rows.forEach((element) => {
      this.tableCategory.table_body.push({
        ca_id: element.ca_id,
        ca_name: element.ca_name,
        ca_description: element.ca_description,
        inputEditable: false,
        actions: [
          { show: true, action: 'edit', icon: 'fas fa-pencil-alt' },
          { show: true, action: 'delete', icon: 'fas fa-trash' },
        ],
      });
    });
    this.tableCategory.totalData = data.body.count;
  }
}
