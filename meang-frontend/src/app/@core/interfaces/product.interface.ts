export interface Iproduct {
  pro_id: number;
  prod_name: string;
  prod_description: string;
  prod_price: number;
  prod_discount_price: boolean;
  prod_discount: number;
  prod_price_exit: number;
  prod_stock: number;
  prod_image: string;
  is_last_product: Boolean;
  is_valid: Boolean;
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
