import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};

export type IGenericRessponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
