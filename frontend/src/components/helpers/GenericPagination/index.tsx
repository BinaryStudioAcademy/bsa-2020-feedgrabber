import React, {FC, useEffect} from "react";
import ReactPaginate from 'react-paginate';

import styles from './styles.module.sass';
import {IPaginationInfo} from "../../../models/IPaginationInfo";
import LoaderWrapper from "../LoaderWrapper";
import {useTranslation} from "react-i18next";

interface IGenericPaginationProps {
  isLoading: boolean;
  pagination?: IPaginationInfo<any>;

  setPagination(pagination: IPaginationInfo<any>): void;
  mapItemToJSX(item: any): JSX.Element;
  loadItems(): void;
}

const sizeOptions = [10, 25, 50];
const defaultSize = 10;

const GenericPagination: FC<IGenericPaginationProps> = (
  {
    pagination,
    isLoading,
    setPagination,
    mapItemToJSX,
    loadItems
  }
) => {
  const [t] = useTranslation();

  const getPageCount = () => {
    return pagination
      ? Math.ceil(pagination.total / pagination.size)
      : 0;
  };

  const handleChangePage = (page: number): void => {
    setPagination({...pagination, page});
    loadItems();
  };

  const handleChangeAmountPerPage = (option: string): void => {
    const amount = Number(option);
    setPagination({...pagination, page: 0, size: amount});
    loadItems();
  };

  useEffect(() => {
    if (pagination) {
      if (pagination.page !== 0 && pagination.page >= getPageCount()) {
        handleChangePage(pagination.page - 1);
      }
    } else {
      setPagination({total: 0, page: 0, size: defaultSize, items: []});
      loadItems();
    }
  });

  return (
    <>
      {pagination?.total > 0 && (
        <div className={styles.paginationMetaWrapper}>
          <div>{t("Total")}: <strong>{pagination.total}</strong></div>
          <div>
            <select
              onChange={e => handleChangeAmountPerPage(e.target.value)}
              defaultValue={pagination?.size || defaultSize}
            >
              {sizeOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            &nbsp;{t("items per page")}
          </div>
        </div>
      )}
      <LoaderWrapper loading={isLoading}>
        <div>
          <div className={styles.listWrapper}>
            {pagination?.items?.length > 0
              ? pagination.items.map(i => mapItemToJSX(i))
              : <div className={styles.paginationNoItems}>{t("No items")}</div>}
          </div>
        </div>
      {pagination?.total > 0 && (
        <div className={styles.paginationPagesWrapper}>
          <ReactPaginate
            forcePage={pagination?.page}
            onPageChange={o => handleChangePage(o.selected)}
            pageCount={getPageCount()}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            previousLabel="<"
            nextLabel=">"
            containerClassName={styles.paginationPagesContainer}
            breakLinkClassName={styles.pageLink}
            pageLinkClassName={styles.pageLink}
            previousLinkClassName={styles.pageLink}
            nextLinkClassName={styles.pageLink}
            activeClassName={styles.pageActive}
            disabledClassName={styles.pageDisabled}
          />
        </div>
      )}
      </LoaderWrapper>
    </>
  );
};

export default GenericPagination;
