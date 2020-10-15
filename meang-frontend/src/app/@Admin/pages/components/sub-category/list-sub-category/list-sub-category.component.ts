import { SubCategoryService } from './../../../../../@core/services/subCategory/sub-category.service';
import { Component, OnInit } from '@angular/core';
import { ITable } from '@Service/interfaces/table.interface';
import { IResponseDataCategory } from '@Service/interfaces/sub-categorys.interface';

@Component({
  selector: 'app-list-sub-category',
  templateUrl: './list-sub-category.component.html',
  styleUrls: ['./list-sub-category.component.scss'],
})
export class ListSubCategoryComponent implements OnInit {
  tableSubCategory: ITable;
  constructor(private subcategoryService: SubCategoryService) {
    this.tableSubCategory = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'sca_name',
          nameToShow: 'Nombre',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'sca_description',
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
    this.getSubCategory();
  }

  getSubCategory() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 10,
    };
    this.subcategoryService.getSubCategoryByFilter(filter).subscribe(
      (data: IResponseDataCategory) => {
        this.poblateTableCategory(data);
      },
      (err) => {}
    );
  }

  poblateTableCategory(data: IResponseDataCategory) {
    data.body.rows.forEach((element) => {
      this.tableSubCategory.table_body.push({
        sca_id: element.sca_id,
        sca_name: element.sca_name,
        sca_description: element.sca_description,
        inputEditable: false,
        actions: [
          { show: true, action: 'edit', icon: 'fas fa-pencil-alt' },
          { show: true, action: 'delete', icon: 'fas fa-trash' },
        ],
      });
    });
    this.tableSubCategory.totalData = data.body.count;
  }
}
