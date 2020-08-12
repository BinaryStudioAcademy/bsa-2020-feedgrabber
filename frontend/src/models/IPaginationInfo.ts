export interface IPaginationInfo<T> {
  total: number;
  size: number;
  page: number;
  items: T[];
}
