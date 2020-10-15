export interface ICategory {
  ca_id: number;
  ca_name: string;
  ca_description: string;
  is_valid: boolean;
}

export interface IResponseDataCategorys {
  error: boolean;
  status: number;
  body: IResponse;
}
export interface IResponse {
  count: number;
  rows: ICategory[];
}
