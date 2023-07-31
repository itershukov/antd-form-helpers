export interface IUpdateModel<T> {
  path: Object;
  data: T;
}

export interface IValidationErrorData {
  [fieldName: string]: string[];
}

export interface IError {
  status: number;
  data: IErrorData;
  validation?: IValidationErrorData;
  validationCommon?: string;
}

interface IErrorData {
  message: string;
  statusCode: number;
  code: string;
  error?: string;
  errors?: {
    [key: string]: IValidationError[];
  };
}

interface IValidationError {
  message: string;
  code: string;
  params?: {
    [key: string]: any;
  };
}
