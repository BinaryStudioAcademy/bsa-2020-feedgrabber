import { callApi } from 'helpers/api.helper';

export const getData = async () => {
  const response = await callApi({
    endpoint: '/api/data/',
    type: 'GET'
  });

  return response.json();
};
