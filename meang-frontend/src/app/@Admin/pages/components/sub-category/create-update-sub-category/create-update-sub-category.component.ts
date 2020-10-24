import { SubCategoryService } from './../../../../../@core/services/subCategory/sub-category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  IResponseDataSubCategory,
  ISubCategory,
} from '@Service/interfaces/sub-categorys.interface';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-create-update-sub-category',
  templateUrl: './create-update-sub-category.component.html',
  styleUrls: ['./create-update-sub-category.component.scss'],
})
export class CreateUpdateSubCategoryComponent implements OnInit {
  label: string;
  formSubCategory: Partial<ISubCategory> = {
    sca_name: '',
    sca_description: '',
    is_valid: 1,
  };
  idSubcategory: number;
  constructor(
    private activeRoute: ActivatedRoute,
    private subCategoryService: SubCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        this.idSubcategory = res.id;
        this.label = 'Actualizar Categoria';
        this.getSubCategory(res.id);
      } else {
        this.label = 'Crear Categoria';
      }
    });
  }

  getSubCategory(id: number) {
    const filter = {
      filter: {
        sca_id: id,
      },
    };
    this.subCategoryService.getSubCategoryByFilter(filter).subscribe(
      (data: IResponseDataSubCategory) => {
        data.body.rows.forEach((element) => {
          this.formSubCategory = {
            sca_name: element.sca_name,
            sca_description: element.sca_description,
          };
        });
      },
      (err) => {
        basicAlert(
          'Sub Categoria',
          'Error Al Obtener',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }
  saveSubCategory() {
    if (this.idSubcategory) {
      this.subCategoryService
        .updateCategory(this.idSubcategory, this.formSubCategory)
        .subscribe(
          (data: IResponseDataSubCategory) => {
            if (!data.error) {
              basicAlert(
                'Sub Categoria',
                'Actualizado Correctamente',
                'Aceptar',
                Types_Alert.SUCCESS
              );
              this.router.navigate(['/admin/sub-category/list']);
            } else {
            }
          },
          (err) => {
            basicAlert(
              'Sub Categoria',
              'Error Al Actualizar',
              'Aceptar',
              Types_Alert.SUCCESS
            );
            console.log(err);
          }
        );
    } else {
      this.subCategoryService.createSubCategory(this.formSubCategory).subscribe(
        (data: IResponseDataSubCategory) => {
          if (!data.error) {
            basicAlert(
              'Sub Categoria',
              'Creada Correctamente',
              'Aceptar',
              Types_Alert.SUCCESS
            );
            this.router.navigate(['/admin/sub-category/list']);
          } else {
            basicAlert(
              'Sub Categoria',
              'Error Al Crear',
              'Aceptar',
              Types_Alert.ERROR
            );
          }
        },
        (err) => {
          basicAlert(
            'Sub Categoria',
            'Error Al Crear',
            'Aceptar',
            Types_Alert.ERROR
          );
          console.log(err);
        }
      );
    }
  }
}
