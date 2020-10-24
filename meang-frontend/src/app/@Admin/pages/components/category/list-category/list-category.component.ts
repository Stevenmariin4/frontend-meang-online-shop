import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IResponseCategory,
  IResponseDataCategorys,
} from '@Service/interfaces/category.interface';
import { ITable } from '@Service/interfaces/table.interface';
import { CategoryService } from '@Service/services/category/category.service';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements OnInit {
  tableCategory: ITable;
  sortColumn;
  filterApplied;
  pageNumber = 0;
  pageSize = 10;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
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
      page: 0,
    };
    this.categoryService.getCategoryByFilter(filter).subscribe(
      (data: IResponseDataCategorys) => {
        this.poblateTableCategory(data);
      },
      (err) => {}
    );
  }

  poblateTableCategory(data: IResponseDataCategorys) {
    this.tableCategory.table_body = [];
    data.body.rows.forEach((element) => {
      this.tableCategory.table_body.push({
        id: element.ca_id,
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

  redirectCreate(id: any) {
    if (id !== 0) {
      this.router.navigate(['/admin/category/update/', id]);
    } else {
      this.router.navigate(['/admin/category/create']);
    }
  }

  async actionHandler(action: any) {
    switch (action.action) {
      case 'edit':
        this.router.navigate([`/admin/category/update/${action.idItem}`]);
        break;
      case 'delete':
        this.deleteCategory(action.idItem);
        break;
      default:
        break;
    }
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(
      (data) => {
        if (!data.error) {
          basicAlert(
            'Categoria',
            'Categoria Eliminada Correctamente',
            'Aceptar',
            Types_Alert.SUCCESS
          );
          this.getCategory();
        } else {
          basicAlert(
            'Categoria',
            'Erro al eliminar Categoria',
            'Aceptar',
            Types_Alert.ERROR
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  pageChanger(page: any) {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: page.pageSize,
      page: page.page,
    };
    this.categoryService.getCategoryByFilter(filter).subscribe(
      (data: IResponseDataCategorys) => {
        this.poblateTableCategory(data);
      },
      (err) => {
        basicAlert(
          'Categorias',
          'Error Al Obtener',
          'Aceptar',
          Types_Alert.ERROR
        );
        console.log(err);
      }
    );
  }
}
