export interface ISize {
  size_id: number;
  size_name: string;
  size_description: string;
  is_valid: boolean;
}

export interface IResponseDataSize {
  error: boolean;
  status: number;
  body: IResponseSize;
}
export interface IResponseSize {
  count: number;
  rows: ISize[];
}
