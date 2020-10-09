export interface ILoginform {
  email: string;
  password: string;
}

export interface ILoginResponse {
  error: boolean;
  status: number;
  body: IuserLoginData;
}

export interface IuserLoginData {
  token: string;
  id: number;
}
