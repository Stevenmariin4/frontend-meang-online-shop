export interface IregisterUser {
  use_use_name: any;
  use_id: number;
  use_name: string;
  use_lastname: string;
  use_age: number;
  use_email: string;
  use_password: string;
  use_phone: string;
  use_status: boolean | number;
  ro_id: number;
  is_valid: number;
}
export interface IResponseDataUser {
  error: boolean;
  status: number;
  body: IResponseUsers;
}
export interface IResponseUsers {
  count: number;
  rows: IregisterUser[];
}
