export interface ISubCategory {
  sca_id: number;
  sca_name: string;
  sca_description: string;
  is_valid: true;
}

export interface IResponseDataCategory {
  error: boolean;
  status: number;
  body: IResponse;
}
export interface IResponse {
  count: number;
  rows: ISubCategory[];
}
