import {
  IColor,
  IResponseDataColors,
} from './../../../../../@core/interfaces/colors.interface';
import { ColorService } from './../../../../../@core/services/colors/color.service';
import { SizeService } from './../../../../../@core/services/sizes/size.service';
import { async } from '@angular/core/testing';
import { ColorProductService } from './../../../../../@core/services/color-product/color-product.service';
import { SizeProductService } from './../../../../../@core/services/sizes-product/size-product.service';
import { ITable } from './../../../../../@core/interfaces/table.interface';
import { ProductsService } from '@Service/services/product/products.service';
import { UploadService } from './../../../../../@core/services/upload/upload.service';
import { SubCategoryService } from './../../../../../@core/services/subCategory/sub-category.service';
import { CategoryService } from './../../../../../@core/services/category/category.service';
import { Component, OnInit } from '@angular/core';
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
import { IResponseDataSize, ISize } from '@Service/interfaces/size.interface';
import {
  IProductBySize,
  IProductSize,
  IResponseDataProduct,
  IResponseDataProductBySize,
} from '@Service/interfaces/produc_size.interface';
import {
  IProductByColor,
  IProductByColors,
  IResponseDataProductByColors,
} from '@Service/interfaces/product_color.interface';
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
    sca_id: null,
    is_valid: 1,
  };
  ArrayproductSize: Partial<IProductSize> = { is_valid: 1 };
  ArrayproductColor: Partial<IProductByColor> = { is_valid: 1 };
  arrayCategory: Partial<ICategory>[];
  arraySubCategory: Partial<ISubCategory>[];
  ListColors: Partial<IColor>[];
  ListSize: Partial<ISize>[];
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
    private sizeservice: SizeService,
    private colorservice: ColorService
  ) {
    this.arrayCategory = [];
    this.arraySubCategory = [];
    this.DataFile = [];
    this.ListSize = [];
    this.ListColors = [];
    this.tableProductColor = {
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
    this.tableProductSize = {
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
  }

  async ngOnInit() {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        this.idProduct = res.id;
        this.label = 'Actualizar Producto';
        this.ArrayproductSize.prod_id = res.id;
        this.ArrayproductColor.prod_id = res.id;
        await this.getProduct(res.id);
        await this.getProductSize(res.id);
        await this.getProductColor(res.id);
      } else {
        this.label = 'Crear Producto';
      }
    });
    await this.getCategory();
    await this.getSubCategory();
    await this.getsize();
    await this.getcolor();
  }

  // Obtener Todo el product
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
      (err) => {
        basicAlert(
          'Productos',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.ERROR
        );
      }
    );
  }
  // Obtener las tallas asignadas a este producto
  getProductSize(id) {
    const filter = {
      filter: {
        prod_id: id,
        is_valid: 1,
      },
      limit: 10,
    };
    this.productSize.getFilter(filter).subscribe(
      (data: IResponseDataProductBySize) => {
        if (data.error) {
          basicAlert(
            'Tallas',
            'Error Al Obtener Lista',
            'Aceptar',
            Types_Alert.ERROR
          );
        } else {
          this.poblateTableProductBySize(data);
        }
      },
      (err) => {
        basicAlert(
          'Tallas',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.ERROR
        );
      }
    );
  }
  // Obtener los colores asignados a este producto
  getProductColor(id) {
    const filter = {
      filter: {
        prod_id: id,
        is_valid: 1,
      },
      limit: 10,
    };
    this.productColor.getFilter(filter).subscribe(
      (data: IResponseDataProductByColors) => {
        if (data.error) {
          basicAlert(
            'Color',
            'Error Al Obtener Lista',
            'Aceptar',
            Types_Alert.ERROR
          );
        } else {
          this.poblateTableProductByColor(data);
        }
      },
      (err) => {
        console.log(err);
        basicAlert(
          'Color',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.ERROR
        );
      }
    );
  }
  // Obtener todas las tallas
  getsize() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 10,
    };
    this.sizeservice.getFilter(filter).subscribe(
      (data: IResponseDataSize) => {
        if (data.error) {
          basicAlert(
            'Tallas',
            'Error Al Obtener Lista',
            'Aceptar',
            Types_Alert.ERROR
          );
        } else {
          this.poblateListSize(data);
        }
      },
      (err) => {
        basicAlert(
          'Tallas',
          'Error Al Obtener Lista',
          'Aceptar',
          Types_Alert.ERROR
        );
      }
    );
  }
  // Obtener Colores
  getcolor() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 10,
    };
    this.colorservice
      .getColorFilter(filter)
      .subscribe((data: IResponseDataColors) => {
        if (data.error) {
          basicAlert(
            'Color',
            'Error Al Obtener Lista',
            'Aceptar',
            Types_Alert.ERROR
          );
        } else {
          this.poblateListColor(data);
        }
      });
  }

  // Poblar los datos del producto
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
        sca_id: element.sca_id,
      };
    });
  }
  // Poblar la tabla de tallas por producto
  poblateTableProductBySize(data: IResponseDataProductBySize) {
    this.tableProductSize.table_body = [];
    data.body.rows.forEach((element: IProductBySize) => {
      this.tableProductSize.table_body.push({
        id: element.product_size_id,
        size_name: element.relationship_product_size.size_name,
        inputEditable: false,
        actions: [{ show: true, action: 'delete', icon: 'fas fa-trash' }],
      });
      this.tableProductSize.totalData = data.body.count;
    });
  }
  // Poblar la tabla de tallas por producto
  poblateTableProductByColor(data: IResponseDataProductByColors) {
    this.tableProductColor.table_body = [];
    data.body.rows.forEach((element: IProductByColors) => {
      this.tableProductColor.table_body.push({
        id: element.pro_col_id,
        col_name: element.relationship_product_color.col_name,
        inputEditable: false,
        actions: [{ show: true, action: 'delete', icon: 'fas fa-trash' }],
      });
      this.tableProductColor.totalData = data.body.count;
    });
  }
  // Poblar la lista de tallas
  poblateListSize(data: IResponseDataSize) {
    data.body.rows.forEach((element: ISize) => {
      this.ListSize.push({
        size_id: element.size_id,
        size_name: element.size_name,
      });
    });

    console.log(this.ListSize);
  }

  // Poblar la lista de colores
  poblateListColor(data: IResponseDataColors) {
    data.body.rows.forEach((element: IColor) => {
      this.ListColors.push({
        col_id: element.col_id,
        col_name: element.col_name,
      });
    });
  }
  // Obtener las Categorias
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
  // Obtener las SubCategorias
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
  // Subir la imagen de un producto
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

  // Validar si el producto tiene descuento
  onOptionsSelected(data: any) {
    const values = data === 'True' ? true : false;
    this.formProduct.prod_discount_price = values;
  }
  // Valida la categoria asignada a este producto
  onOptionsCategory(data: any) {
    this.formProduct.ca_id = data;
  }
  // Valida la sub categoria asignada a este producto
  onOptionsSubCategory(data: any) {
    this.formProduct.sca_id = parseInt(data);
  }
  // Valida la Talla asignada a este producto
  onOptionSize(data: any) {
    this.ArrayproductSize.size_id = data;
  }
  // Valida el color asignara a este producto
  onOptionsColor(data: any) {
    this.ArrayproductColor.col_id = data;
  }
  // Obtiene el valor del descuento que va tener el producto
  getDiscount(data: number): number {
    const discount: number = (this.formProduct.prod_price * data) / 100;
    return discount;
  }
  // Guarda un producto
  async save() {
    if (
      !this.formProduct.prod_name ||
      !this.formProduct.prod_price ||
      !this.formProduct.ca_id ||
      !this.formProduct.sca_id ||
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
  // El archivo de imagen lo asigna para subir al producto
  onFileChange(e) {
    this.filePath = e.target.files[0];
  }
  // Carga el archivo a firebase
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
  // crear el color por producto
  openCreatecolor() {
    if (!this.ArrayproductColor.prod_id) {
      basicAlert(
        'Error',
        'Debe Crear un producto antes de asignar una talla',
        'Aceptar',
        Types_Alert.WARNING
      );
    } else {
      this.productColor
        .create(this.ArrayproductColor)
        .subscribe((data: IResponseDataProductByColors) => {
          if (data.error) {
            basicAlert(
              'Color Producto',
              'Error Al Crear',
              'Aceptar',
              Types_Alert.WARNING
            );
          } else {
            basicAlert(
              'Color Producto',
              'Creado Correctamente',
              'Aceptar',
              Types_Alert.WARNING
            );
            this.getProductColor(this.idProduct);
          }
        });
    }
  }
  // Crearo la talla por producto
  openCreateProductSize() {
    if (!this.ArrayproductSize.prod_id) {
      basicAlert(
        'Error',
        'Debe Crear un producto antes de asignar una talla',
        'Aceptar',
        Types_Alert.WARNING
      );
    } else {
      this.productSize.create(this.ArrayproductSize).subscribe(
        (data: IResponseDataProduct) => {
          if (data.error) {
            basicAlert(
              'Asiganar Talla Al Product',
              'Error Al Obtener Crear',
              'Aceptar',
              Types_Alert.ERROR
            );
          } else {
            basicAlert(
              'Asiganar Talla Al Product',
              'Creado Correctamente',
              'Aceptar',
              Types_Alert.SUCCESS
            );

            this.getProductSize(this.idProduct);
          }
        },
        (err) => {
          basicAlert(
            'Asiganar Talla Al Product',
            'Error Al Obtener Crear',
            'Aceptar',
            Types_Alert.ERROR
          );
        }
      );
    }
  }
  deleteProductSize(id) {
    this.productSize.deleted(id).subscribe(
      (data: IResponseDataProduct) => {
        if (data.error) {
          basicAlert(
            'Producto Talla',
            'Error Al Eliminar',
            'Aceptar',
            Types_Alert.ERROR
          );
        } else {
          basicAlert(
            'Producto Talla',
            'Eliminado Correctamente',
            'Aceptar',
            Types_Alert.SUCCESS
          );

          this.getProductSize(this.idProduct);
        }
      },
      (err) => {
        basicAlert(
          'Producto Talla',
          'Error Al Eliminar',
          'Aceptar',
          Types_Alert.ERROR
        );
      }
    );
  }
  // Acciones sobre las tablas
  async actionHandler(action: any, table: any) {
    switch (table) {
      case 'size':
        switch (action.action) {
          case 'edit':
            this.router.navigate([`/admin/product/update/${action.idItem}`]);
            break;
          case 'delete':
            this.deleteProductSize(action.idItem);
            break;
          default:
            break;
        }
        break;
      case 'color':
        break;
    }
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
  // PAginador de tabblas
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
  // Filtros de tablas
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
