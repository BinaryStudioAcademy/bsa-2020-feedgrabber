import * as queryString from 'query-string';
import { toastr } from 'react-redux-toastr';
import { IFetchArgsData } from 'models/IFetchArgsData';
import { IFetchArgs } from 'models/IFetchArgs';

const getFetchUrl = ({ endpoint, queryParams }: IFetchArgsData) => `${endpoint}${
  queryParams ? `?${queryString.stringify(queryParams)}` : ''
}`;

const getInitHeaders = (contentType = 'application/json', hasContent = true) => {
  const headers: HeadersInit = new Headers();
  if (hasContent) {
    headers.set('Content-Type', contentType);
  }
  return headers;
};

const getFetchArgs = (args: IFetchArgsData): IFetchArgs => {
  const headers = getInitHeaders();

  if (args.requestData && args.type === 'GET') {
    throw new Error('GET request does not support request body.');
  }

  return {
    method: args.type,
    headers,
    ...(args.type === 'GET' ? {} : { body: JSON.stringify(args.requestData) })
  };
};

const throwIfResponseFailed = async (res: Response) => {
  if (!res.ok) {
    if (res.status === 401) {
      // logout
    }
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
      toastr.error('Error!', parsedException);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`An error occurred: ${err}`);
      toastr.error('Error!', err);
    }
    throw parsedException;
  }
};

export const callApi = async (args: IFetchArgsData): Promise<Response> => {
  const res = await fetch(getFetchUrl(args), getFetchArgs(args));
  await throwIfResponseFailed(res);
  return res;
};
