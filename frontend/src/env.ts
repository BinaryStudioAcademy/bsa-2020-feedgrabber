import { getOsEnv } from 'helpers/path.helper';

export const env = {
  baseHost: getOsEnv('REACT_APP_BASE_HOST'),
  basePort: getOsEnv('REACT_APP_BASE_PORT')
};
