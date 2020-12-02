import { SubCategoryService } from './../../../../../@core/services/subCategory/sub-category.service';
import { Component, OnInit } from '@angular/core';
import { ITable } from '@Service/interfaces/table.interface';
import { IResponseDataSubCategory } from '@Service/interfaces/sub-categorys.interface';
import { Router } from '@angular/router';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-list-sub-category',
  templateUrl: './list-sub-category.component.html',
  styleUrls: ['./list-sub-category.component.scss'],
})
export class ListSubCategoryComponent implements OnInit {
  tableSubCategory: ITable;
  sortColumn;
  filterApplied;
  pageNumber = 0;
  pageSize = 10;
  constructor(
    private subcategoryService: SubCategoryService,
    private router: Router
  ) {
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
  async actionHandler(action: any) {
    switch (action.action) {
      case 'edit':
        this.router.navigate([`/admin/sub-category/update/${action.idItem}`]);
        break;
      case 'delete':
        this.deleteSubCategory(action.idItem);
        break;
      default:
        break;
    }
  }

  getSubCategory() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 10,
    };
    this.subcategoryService.getSubCategoryByFilter(filter).subscribe(
      (data: IResponseDataSubCategory) => {
        this.poblateTableCategory(data);
      },
      (err) => {}
    );
  }

  poblateTableCategory(data: IResponseDataSubCategory) {
    this.tableSubCategory.table_body = [];
    data.body.rows.forEach((element) => {
      this.tableSubCategory.table_body.push({
        id: element.sca_id,
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

  redirectCreate(id: any) {
    if (id !== 0) {
      this.router.navigate(['/admin/sub-category/update/', id]);
    } else {
      this.router.navigate(['/admin/sub-category/create']);
    }
  }

  deleteSubCategory(id) {
    this.subcategoryService.deleteCategory(id).subscribe(
      (data: IResponseDataSubCategory) => {
        if (!data.error) {
          basicAlert(
            'Sub Categoria',
            'Eliminada Correctamente',
            'Aceptar',
            Types_Alert.SUCCESS
          );
          this.getSubCategory();
        } else {
          basicAlert(
            'Sub Categoria',
            'Error Al Eliminar',
            'Aceptar',
            Types_Alert.ERROR
          );
        }
      },
      (err) => {
        basicAlert(
          'Sub Categoria',
          'Error Al Eliminar',
          'Aceptar',
          Types_Alert.ERROR
        );
        console.log(err);
      }
    );
  }
  pageChanger(page: any) {
    this.pageNumber = page.page;
    this.pageSize = page.pageSize;
  }
}