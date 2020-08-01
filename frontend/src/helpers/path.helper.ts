import { join } from "path";

export const getOsEnv = (key: string): string => process.env[key] as string;

export const getPath = (path: string): string => join(process.cwd(), path);

export const getPaths = (paths: string[]): string[] =>
  paths.map(p => getPath(p));

export const getOsEnvArray = (key: string, delimiter = ","): string[] =>
  (process.env[key] && process.env[key].split(delimiter)) || [];

export const getOsPaths = (key: string): string[] =>
  getPaths(getOsEnvArray(key));
