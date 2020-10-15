export interface ITable {
  table_filters: Array<Partial<IFilter>>;
  table_headers: Array<Partial<IHeader>>;
  table_body: Array<object>;
  pageSize: number;
  numOfPages: number;
  totalData: number;
  currentPage: number;
}

export interface IHeader {
  propertyName: string;
  nameToShow: string;
  sort: string | null;
  inputType: string;
  options: Array<object>;
}

export interface IFilter {
  propertyName: string;
  nameToShow: string;
  inputType: string;
  sourceData: string;
  options: Array<object>;
  checkOptions: Array<object>;
  radioOptions: Array<object>;
  defaultOptions: Array<object>;
}

export interface IDefaultOption {
  id: number;
  value: string;
}
