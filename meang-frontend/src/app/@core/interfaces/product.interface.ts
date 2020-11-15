export interface Iproduct {
  prod_id: number;
  prod_name: string;
  prod_description: string;
  prod_price: number;
  prod_discount_price: number | boolean;
  prod_discount: number;
  prod_price_exit: number;
  prod_stock: number;
  prod_image: string;
  is_last_product: number | boolean;
  ca_id: number;
  scan_id: number;
  is_valid: number;
}
export interface IproductShop {
  prod_id: number;
  prod_name: string;
  prod_description: string;
  prod_price: number;
  prod_stock: number;
  prod_discount_price: number | boolean;
  prod_discount: number;
  prod_price_exit: number;
  prod_image: string;
  prod_qty: number;
}

export interface IResponseData {
  error: boolean;
  status: number;
  body: IResponse;
}
export interface IResponse {
  count: number;
  rows: Iproduct[];
}
