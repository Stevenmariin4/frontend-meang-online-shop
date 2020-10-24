import { CategoryService } from './../../../../../@core/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ICategory,
  IResponseDataCategorys,
} from '@Service/interfaces/category.interface';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-create-update-category',
  templateUrl: './create-update-category.component.html',
  styleUrls: ['./create-update-category.component.scss'],
})
export class CreateUpdateCategoryComponent implements OnInit {
  label: string;
  formCategory: Partial<ICategory> = {
    ca_name: '',
    ca_description: '',
    is_valid: 1,
  };
  idCategory: number;
  constructor(
    private activeRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        this.idCategory = res.id;
        this.label = 'Actualizar Categoria';
        this.getCategory(res.id);
      } else {
        this.label = 'Crear Categoria';
      }
    });
  }
  saveCategory() {
    if (this.idCategory) {
      this.categoryService
        .UpdateCategory(this.idCategory, this.formCategory)
        .subscribe(
          (data: IResponseDataCategorys) => {
            if (!data.error) {
              basicAlert(
                'Categoria',
                'Categoria Actualizada Correctamente',
                'Aceptar',
                Types_Alert.SUCCESS
              );
              this.router.navigate(['/admin/category/list']);
            } else {
              basicAlert(
                'Categoria',
                'Erro Al  Actualizar Categoria',
                'Aceptar',
                Types_Alert.ERROR
              );
            }
          },
          (err) => {
            basicAlert(
              'Categoria',
              'Erro Al  Actualizar Categoria',
              'Aceptar',
              Types_Alert.ERROR
            );
            console.log(err);
          }
        );
    } else {
      this.categoryService.createCategory(this.formCategory).subscribe(
        (data: IResponseDataCategorys) => {
          if (!data.error) {
            basicAlert(
              'Categoria',
              'Categoria Creada Correctamente',
              'Aceptar',
              Types_Alert.SUCCESS
            );
            this.router.navigate(['/admin/category/list']);
          } else {
            basicAlert(
              'Categoria',
              'Erro Al  Creada Correctamente',
              'Aceptar',
              Types_Alert.ERROR
            );
          }
        },
        (err) => {
          basicAlert(
            'Categoria',
            'Error Al Actualizar Caregoria',
            'Aceptar',
            Types_Alert.ERROR
          );
          console.log(err);
        }
      );
    }
  }

  getCategory(id: number) {
    const filter = {
      filter: {
        ca_id: id,
      },
      limit: 10,
    };
    this.categoryService.getCategoryByFilter(filter).subscribe(
      (data: IResponseDataCategorys) => {
        data.body.rows.forEach((element) => {
          this.formCategory = {
            ca_name: element.ca_name,
            ca_description: element.ca_description,
          };
        });
      },
      (err) => {}
    );
  }
}
