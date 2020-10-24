import { ColorService } from './../../../../../@core/services/colors/color.service';
import { Component, OnInit } from '@angular/core';
import { ITable } from '@Service/interfaces/table.interface';
import { IResponseDataColors } from '@Service/interfaces/colors.interface';
import { Router } from '@angular/router';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-list-colors',
  templateUrl: './list-colors.component.html',
  styleUrls: ['./list-colors.component.scss'],
})
export class ListColorsComponent implements OnInit {
  tableColors: ITable;
  constructor(private serviceColor: ColorService, private router: Router) {
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
      page: 0,
    };
    this.serviceColor.getColorFilter(filter).subscribe(
      (data: IResponseDataColors) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Colores',
          'Error Al Obtener Lista Colores',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }

  poblateTableProduct(data: IResponseDataColors) {
    this.tableColors.table_body = [];
    data.body.rows.forEach((element) => {
      this.tableColors.table_body.push({
        id: element.col_id,
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
  redirectCreate(id: any) {
    if (id !== 0) {
      this.router.navigate(['/admin/colors/update/', id]);
    } else {
      this.router.navigate(['/admin/colors/create']);
    }
  }
  async actionHandler(action: any) {
    switch (action.action) {
      case 'edit':
        this.router.navigate([`/admin/colors/update/${action.idItem}`]);
        break;
      case 'delete':
        this.deleteColor(action.idItem);
        break;
      default:
        break;
    }
  }

  deleteColor(id: number) {
    this.serviceColor.deletedColor(id).subscribe(
      (data: IResponseDataColors) => {
        if (!data.error) {
          basicAlert(
            'Colores',
            'Color Eliminado Correntamente',
            'Aceptar',
            Types_Alert.SUCCESS
          );
          this.getColors();
        } else {
          basicAlert(
            'Colores',
            'Error Al ELiminar Color',
            'Aceptar',
            Types_Alert.ERROR
          );
        }
      },
      (err) => {
        basicAlert(
          'Colores',
          'Error Al ELiminar Color',
          'Aceptar',
          Types_Alert.ERROR
        );
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
    this.serviceColor.getColorFilter(filter).subscribe(
      (data: IResponseDataColors) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Colores',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.ERROR
        );
        console.log(err);
      }
    );
  }
}
