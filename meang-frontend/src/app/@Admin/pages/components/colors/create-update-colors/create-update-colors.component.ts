import { ColorService } from './../../../../../@core/services/colors/color.service';
import { Component, OnInit } from '@angular/core';
import {
  IColor,
  IResponseDataColors,
} from '@Service/interfaces/colors.interface';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create-update-colors',
  templateUrl: './create-update-colors.component.html',
  styleUrls: ['./create-update-colors.component.scss'],
})
export class CreateUpdateColorsComponent implements OnInit {
  label: string;
  idcolor: number;
  formColor: Partial<IColor> = {
    col_name: '',
    col_description: '',
    is_valid: 1,
  };
  constructor(
    private colorService: ColorService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        this.idcolor = res.id;
        this.label = 'Actualizar Color';
        this.getColorById(res.id);
      } else {
        this.label = 'Crear Color';
      }
    });
  }

  saveColor() {
    if (this.idcolor) {
      this.colorService.updateColor(this.idcolor, this.formColor).subscribe(
        (data: IResponseDataColors) => {
          if (!data.error) {
            basicAlert(
              'Colores',
              'Color Actualizado Correctamente',
              'Aceptar',
              Types_Alert.SUCCESS
            );
            this.router.navigate(['/admin/colors/list']);
          } else {
            basicAlert(
              'Colores',
              'Error Al Actualizar Color',
              'Aceptar',
              Types_Alert.SUCCESS
            );
          }
        },
        (err) => {
          basicAlert(
            'Colores',
            'Error Al Actualizar Color',
            'Aceptar',
            Types_Alert.SUCCESS
          );
          console.log(err);
        }
      );
    } else {
      this.colorService.createColor(this.formColor).subscribe(
        (data: IResponseDataColors) => {
          if (!data.error) {
            basicAlert(
              'Colores',
              'Color Creado Correctamente',
              'Aceptar',
              Types_Alert.SUCCESS
            );
            this.router.navigate(['/admin/colors/list']);
          } else {
            basicAlert(
              'Colores',
              'Error Al Crear Color',
              'Aceptar',
              Types_Alert.SUCCESS
            );
          }
        },
        (err) => {
          basicAlert(
            'Colores',
            'Error Al Crear Color',
            'Aceptar',
            Types_Alert.SUCCESS
          );
          console.log(err);
        }
      );
    }
  }
  getColorById(id: any) {
    const filter = {
      filter: {
        col_id: id,
      },
      limit: 10,
    };
    this.colorService.getColorFilter(filter).subscribe(
      (data: IResponseDataColors) => {
        if (!data.error) {
          data.body.rows.forEach((element) => {
            this.formColor = {
              col_id: element.col_id,
              col_name: element.col_name,
              col_description: element.col_description,
            };
          });
        } else {
          basicAlert(
            'Colores',
            'Error Al Obtener Color',
            'Aceptar',
            Types_Alert.SUCCESS
          );
        }
      },
      (err) => {
        basicAlert(
          'Colores',
          'Error Al Obtener Color',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }
}
