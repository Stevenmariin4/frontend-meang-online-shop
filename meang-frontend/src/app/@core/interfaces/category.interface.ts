export interface ICategory {
  ca_id: number;
  ca_name: string;
  ca_description: string;
  is_valid: boolean;
}

export interface IResponseDataCategorys {
  error: boolean;
  status: number;
  body: IResponseCategory;
}
export interface IResponseCategory {
  count: number;
  rows: ICategory[];
}
