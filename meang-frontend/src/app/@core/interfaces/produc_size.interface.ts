import { ISize } from '@Service/interfaces/size.interface';
export interface IProductSize {
  size_id: number;
  prod_id: number;
  is_valid: number;
}
export interface IResponseDataProduct {
  error: boolean;
  status: number;
  body: IResponseSizeProduct;
}
export interface IResponseSizeProduct {
  count: number;
  rows: IProductSize[];
}
export interface IProductBySize {
  product_size_id: number;
  is_valid: number;
  relationship_product_size: ISize;
}

export interface IResponseDataProductBySize {
  error: boolean;
  status: number;
  body: IResponseSizeProductBySize;
}
export interface IResponseSizeProductBySize {
  count: number;
  rows: IProductBySize[];
}
