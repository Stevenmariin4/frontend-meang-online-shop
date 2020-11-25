import { IproductShop } from './product.interface';
export interface IFacture {
  fac_id: number;
  use_name: string;
  use_lastname: string;
  use_email: string;
  use_phone: string;
  use_address: string;
  use_city: string;
  use_street: string;
  use_home: string;
  fac_description: string;
  fac_promo_code: string;
  fac_total: string | number;
  is_valid: number;
  fac_status_id: number;
  fac_status: string;
  fa_code: string;
  relationship_facture_status: IFactureStatus;
}
export interface IFactureResponse {
  error: boolean;
  status: number;
  body: any;
}
export interface IResponseFactuteData {
  error: boolean;
  status: number;
  body: IResponseFacture;
}
export interface IResponseFacture {
  count: number;
  rows: IFacture[];
}
export interface IFactureStatus {
  fac_status_id: number;
  fac_status_name: string;
  fac_status_description: string;
}

export interface IFactureDetail {
  fac_detail_id: number;
  prod_qty: string | number;
  fac_product_id: number;
  relationship_facture_product: IproductShop;
}

export interface IResponseFactuteDetailData {
  error: boolean;
  status: number;
  body: IResponseFactureDetail;
}
export interface IResponseFactureDetail {
  count: number;
  rows: IFactureDetail[];
}
