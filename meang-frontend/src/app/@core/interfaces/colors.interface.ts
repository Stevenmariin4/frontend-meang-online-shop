export interface IColor {
  col_id: number;
  col_name: string;
  col_description: string;
  is_valid: number;
}

export interface IResponseDataColors {
  error: boolean;
  status: number;
  body: IResponseColor;
}
export interface IResponseColor {
  count: number;
  rows: IColor[];
}
