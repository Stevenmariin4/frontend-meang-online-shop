import { async } from '@angular/core/testing';
import { ColorProductService } from './../../../../../@core/services/color-product/color-product.service';
import { SizeProductService } from './../../../../../@core/services/sizes-product/size-product.service';
import { ITable } from './../../../../../@core/interfaces/table.interface';
import { ProductsService } from '@Service/services/product/products.service';
import { UploadService } from './../../../../../@core/services/upload/upload.service';
import { SubCategoryService } from './../../../../../@core/services/subCategory/sub-category.service';
import { CategoryService } from './../../../../../@core/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ICategory,
  IResponseDataCategorys,
} from '@Service/interfaces/category.interface';
import { Iproduct, IResponseData } from '@Service/interfaces/product.interface';
import {
  IResponseDataSubCategory,
  ISubCategory,
} from '@Service/interfaces/sub-categorys.interface';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';
import { IFile } from '@Service/interfaces/file.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { CreateProductColorComponent } from '@Shared/components/create-product-color/create-product-color.component';
export interface User {
  name: string;
}
@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss'],
})
export class CreateUpdateProductComponent implements OnInit {
  label: string;
  tableProductColor: ITable;
  tableProductSize: ITable;
  formProduct: Partial<Iproduct> = {
    prod_name: '',
    prod_description: '',
    prod_price: null,
    prod_discount_price: false,
    prod_discount: null,
    prod_price_exit: null,
    prod_stock: null,
    prod_image: '',
    is_last_product: null,
    ca_id: null,
    scan_id: null,
    is_valid: 1,
  };
  arrayCategory: Partial<ICategory>[];
  arraySubCategory: Partial<ISubCategory>[];
  uploaderFiles: Array<File>;
  IFile: IFile;
  DataFile: Array<Partial<IFile>>;
  idProduct: number;
  filePath: string;
  task: AngularFireUploadTask;
  uriUpload = environment.urlImages;
  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubCategoryService,
    private uploadService: UploadService,
    private activeRoute: ActivatedRoute,
    private serviceProduct: ProductsService,
    private router: Router,
    private afStorage: AngularFireStorage,
    private productSize: SizeProductService,
    private productColor: ColorProductService,
    public dialog: MatDialog
  ) {
    this.arrayCategory = [];
    this.arraySubCategory = [];
    this.DataFile = [];
    this.tableProductColor = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'size_name',
          nameToShow: 'Nombre',
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
    this.tableProductSize = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'col_name',
          nameToShow: 'Nombre',
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

  async ngOnInit() {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        this.idProduct = res.id;
        this.label = 'Actualizar Producto';
        await this.getProduct(res.id);
        await this.getProductSize(res.id);
      } else {
        this.label = 'Crear Producto';
      }
    });
    await this.getCategory();
    await this.getSubCategory();
  }
  getProduct(id) {
    const filter = {
      filter: {
        prod_id: id,
        is_valid: 1,
      },
      limit: 10,
    };
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.poblateTableProduct(data);
      },
      (err) => {}
    );
  }
  getProductSize(id) {
    const filter = {
      filter: {
        prod_id: id,
        is_valid: 1,
      },
      limit: 10,
    };
    this.productSize.getFilter(filter).subscribe(
      (data: any) => {},
      (err) => {
        console.log(err);
      }
    );
  }
  getProductColor(id) {
    const filter = {
      filter: {
        prod_id: id,
        is_valid: 1,
      },
      limit: 10,
    };
    this.productColor.getFilter(filter).subscribe(
      (data: any) => {},
      (err) => {
        console.log(err);
      }
    );
  }

  poblateTableProduct(data: IResponseData) {
    data.body.rows.forEach((element) => {
      this.formProduct = {
        prod_id: element.prod_id,
        prod_name: element.prod_name,
        prod_description: element.prod_description,
        prod_stock: element.prod_stock,
        prod_price_exit: element.prod_price_exit,
        prod_price: element.prod_price,
        prod_discount_price: element.prod_discount_price,
        prod_discount: element.prod_discount,
        prod_image: element.prod_image,
        ca_id: element.ca_id,
        scan_id: element.scan_id,
      };
    });
  }
  getCategory() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 100,
    };
    this.categoryService.getCategoryByFilter(filter).subscribe(
      (data: IResponseDataCategorys) => {
        data.body.rows.forEach((element) => {
          this.arrayCategory.push({
            ca_id: element.ca_id,
            ca_name: element.ca_name,
            ca_description: element.ca_description,
          });
        });
      },
      (err) => {
        basicAlert(
          'Categoria',
          'Error Al Obtener',
          'Aceptar',
          Types_Alert.ERROR
        );
        console.log(err);
      }
    );
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
        data.body.rows.forEach((element) => {
          this.arraySubCategory.push({
            sca_id: element.sca_id,
            sca_name: element.sca_name,
            sca_description: element.sca_description,
          });
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

  onUploadFile(formdata: any) {
    this.uploadService.uploadFile(formdata).subscribe(
      (data) => {
        basicAlert(
          'Imagen',
          'Subida Correctamente',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        this.formProduct.prod_image = data.body;
      },
      (err) => {
        basicAlert(
          'Imagen',
          'Error Al Obtener',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }
  onOptionsSelected(data: any) {
    const values = data === 'True' ? true : false;
    this.formProduct.prod_discount_price = values;
  }
  onOptionsCategory(data: any) {
    this.formProduct.ca_id = data;
  }
  onOptionsSubCategory(data: any) {
    this.formProduct.scan_id = data;
  }

  getDiscount(data: number): number {
    const discount: number = (this.formProduct.prod_price * data) / 100;
    return discount;
  }
  async save() {
    if (
      !this.formProduct.prod_name ||
      !this.formProduct.prod_price ||
      !this.formProduct.ca_id ||
      !this.formProduct.scan_id ||
      !this.formProduct.prod_stock
    ) {
      basicAlert(
        'Campos Obligatorios',
        'Debe Diligenciar Todos Los Campos  Marcados Con Una *',
        'Aceptar',
        Types_Alert.ERROR
      );
    } else if (!this.formProduct.prod_image) {
      basicAlert(
        'IMAGEN',
        'Debe Subir Una Imagen Del Producto',
        'Aceptar',
        Types_Alert.ERROR
      );
    } else {
      if (this.formProduct.prod_discount_price === true) {
        const valueDiscount = await this.getDiscount(
          this.formProduct.prod_discount
        );
        this.formProduct.prod_price_exit =
          this.formProduct.prod_price - valueDiscount;
      } else {
        this.formProduct.prod_price_exit = this.formProduct.prod_price;
      }
      if (!this.idProduct) {
        this.serviceProduct.createProduct(this.formProduct).subscribe(
          (data: IResponseData) => {
            if (!data.error) {
              basicAlert(
                'Producto',
                'Creado Correctamente',
                'Aceptar',
                Types_Alert.SUCCESS
              );
              this.router.navigate(['/admin/product/list']);
            } else {
              basicAlert(
                'Producto',
                'Error Al Crear Producto',
                'Aceptar',
                Types_Alert.ERROR
              );
            }
          },
          (err) => {
            basicAlert(
              'Producto',
              'Error Al Crear Producto',
              'Aceptar',
              Types_Alert.ERROR
            );
            console.log(err);
          }
        );
      } else {
        this.serviceProduct
          .updateProduct(this.idProduct, this.formProduct)
          .subscribe(
            (data: IResponseData) => {
              if (!data.error) {
                basicAlert(
                  'Producto',
                  'Actualizado Correctamente',
                  'Aceptar',
                  Types_Alert.SUCCESS
                );
                this.router.navigate(['/admin/product/list']);
              } else {
                basicAlert(
                  'Producto',
                  'Error Al Actualizar Producto',
                  'Aceptar',
                  Types_Alert.ERROR
                );
              }
            },
            (err) => {
              basicAlert(
                'Producto',
                'Error Al Actualizar Producto',
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
        this.formProduct.prod_image = url;
      });
    }
  }
  openDialogCreatecolor() {
    const dialogRef = this.dialog.open(CreateProductColorComponent, {
      data: {
        action: 2,
      },
    });

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res) {
      }
    });
  }
  async actionHandler(action: any) {
    switch (action.action) {
      case 'edit':
        this.router.navigate([`/admin/product/update/${action.idItem}`]);
        break;
      case 'delete':
        //this.deleteCategory(action.idItem);
        break;
      default:
        break;
    }
  }
  pageChanger(page: any) {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: page.pageSize,
      page: page.page,
    };
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Productos',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }
  filterTable(toSearch: any) {
    const filter = {
      filter: {
        is_valid: 1,
        prod_name: toSearch.fieldToSearch,
      },
    };
    this.serviceProduct.getProductFilter(filter).subscribe(
      (data: IResponseData) => {
        this.poblateTableProduct(data);
      },
      (err) => {
        basicAlert(
          'Productos',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        console.log(err);
      }
    );
  }
}
