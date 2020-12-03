import { IColor } from './colors.interface';
export interface IProductByColor {
  col_id: number;
  prod_id: number;
  is_valid: number;
}
export interface IResponseDataProductByColor {
  error: boolean;
  status: number;
  body: IResponseSizeProductByColor;
}
export interface IResponseSizeProductByColor {
  count: number;
  rows: IProductByColor[];
}
export interface IProductByColors {
  pro_col_id: number;
  is_valid: number;
  relationship_product_color: IColor;
}
export interface IResponseDataProductByColors {
  error: boolean;
  status: number;
  body: IResponseSizeProductByColors;
}
export interface IResponseSizeProductByColors {
  count: number;
  rows: IProductByColors[];
}
