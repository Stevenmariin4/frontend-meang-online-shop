export interface Ipromotions {
  pro_id: number;
  pro_name: string;
  pro_image: string;
  is_valid: Boolean;
}

export interface IResponseDataPromotions {
  error: boolean;
  status: number;
  body: IResponse;
}
export interface IResponse {
  count: number;
  rows: Ipromotions[];
}
