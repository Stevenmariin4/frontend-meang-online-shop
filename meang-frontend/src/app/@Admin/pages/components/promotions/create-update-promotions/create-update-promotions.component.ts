import { PromotionsService } from '@Service/services/promotions/promotions.service';
import { UploadService } from '@Service/services/upload/upload.service';
import {
  Ipromotions,
  IResponseDataPromotions,
} from '@Service/interfaces/promotions.interface';
import { Component, OnInit } from '@angular/core';
import { IFile } from '@Service/interfaces/file.interface';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

@Component({
  selector: 'app-create-update-promotions',
  templateUrl: './create-update-promotions.component.html',
  styleUrls: ['./create-update-promotions.component.scss'],
})
export class CreateUpdatePromotionsComponent implements OnInit {
  label: string;
  formPromotion: Partial<Ipromotions> = {
    pro_name: '',
    pro_image: '',
    is_valid: 1,
  };
  url: string;
  uploaderFiles: Array<File>;
  IFile: IFile;
  DataFile: Array<Partial<IFile>>;
  idPromotion: number;
  filePath: String;
  basePath = '/images';
  task: AngularFireUploadTask;
  constructor(
    private uploadServices: UploadService,
    private promotionService: PromotionsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private afStorage: AngularFireStorage
  ) {
    this.DataFile = [];
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        this.idPromotion = res.id;
        this.label = 'Actualizar Color';
        this.getPromotion(res.id);
      } else {
        this.label = 'Crear Color';
      }
    });
  }

  getPromotion(id) {
    const filter = {
      filter: {
        pro_id: id,
      },
      limit: 10,
    };
    this.promotionService.getPromotionByFilter(filter).subscribe(
      (data: IResponseDataPromotions) => {
        data.body.rows.forEach((element) => {
          this.formPromotion = {
            pro_name: element.pro_name,
            pro_image: element.pro_image,
          };
        });
      },
      (err) => {
        basicAlert(
          'Promociones',
          'Error Al Crear',
          'Aceptar',
          Types_Alert.ERROR
        );
        console.log(err);
      }
    );
  }

  savePromotion() {
    if (this.formPromotion.pro_image === '') {
    } else {
      if (this.idPromotion) {
        this.promotionService
          .UpdatePromotion(this.idPromotion, this.formPromotion)
          .subscribe(
            (data) => {
              if (!data.error) {
                basicAlert(
                  'Promociones',
                  'Actualizado Correctamente',
                  'Aceptar',
                  Types_Alert.SUCCESS
                );
                this.router.navigate(['/admin/promotions/list']);
              } else {
              }
            },
            (err) => {
              basicAlert(
                'Promociones',
                'Error Al Actualizar',
                'Aceptar',
                Types_Alert.ERROR
              );
              console.log(err);
            }
          );
      } else {
        this.promotionService.createPromotion(this.formPromotion).subscribe(
          (data) => {
            if (!data.error) {
              basicAlert(
                'Promociones',
                'Creada Correctamente',
                'Aceptar',
                Types_Alert.SUCCESS
              );
              this.router.navigate(['/admin/promotions/list']);
            } else {
            }
          },
          (err) => {
            basicAlert(
              'Promociones',
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

  onFileChange(e) {
    this.filePath = e.target.files[0];
  }
  async onUpload() {
    if (!this.filePath) {
      basicAlert(
        'Subir Archivo',
        'No Se Ha Seleccionado un Archivo',
        'Aceptar',
        Types_Alert.WARNING
      );
    } else {
      this.task = this.afStorage.upload(
        '/images' + Math.random() + this.filePath,
        this.filePath
      );

      (await this.task).ref.getDownloadURL().then((url) => {
        basicAlert(
          'Subir Archivo',
          'Archivo Cargado Correctamente',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        this.formPromotion.pro_image = url;
      });
    }
  }

  onUploadFile(formdata: any) {
    this.uploadServices.uploadFile(formdata).subscribe(
      (data) => {
        basicAlert(
          'Imagen',
          'Subida Correctamente',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        this.formPromotion.pro_image = data.body;
        console.log(this.formPromotion);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
