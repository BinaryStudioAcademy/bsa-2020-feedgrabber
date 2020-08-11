import React, {FC, useEffect} from "react";
import ReactPaginate from 'react-paginate';

import styles from './styles.module.sass';
import {IPaginationInfo} from "../../models/IPaginationInfo";
import {IQuestionnaire} from "../../containers/QuestionnaireList/reducer";
import LoaderWrapper from "../LoaderWrapper";
import PaginationButton, {IGenericButtonProps} from "./button";

interface IGenericPaginationProps {
  title: string;
  isLoading: boolean;
  pagination?: IPaginationInfo<any>;
  buttons: IGenericButtonProps[];

  setPagination(pagination: IPaginationInfo<IQuestionnaire>): void;
  mapItemToJSX(item: any): JSX.Element;
  loadItems(): void;
}

const sizeOptions = [1, 5, 10];
const defaultSize = 5;

const GenericPagination: FC<IGenericPaginationProps> = (
  {
    title,
    pagination,
    isLoading,
    buttons,
    setPagination,
    mapItemToJSX,
    loadItems
  }
) => {
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
    <div className={styles.paginationWrapper}>
      <h1 className={styles.paginationTitle}>{title}</h1>
      <div className={styles.paginationButtonsWrapper}>
        {buttons.map(b => <PaginationButton key={b.text} text={b.text} callback={b.callback}/>)}
      </div>
      <div className={styles.paginationMetaWrapper}>
        {pagination && <div>Total: {pagination.total}</div>}
        <div>
          <select onChange={e => handleChangeAmountPerPage(e.target.value)}>
            {sizeOptions.map(o => <option key={o} selected={o === defaultSize}>{o}</option>)}
          </select>
          &nbsp;items per page
        </div>
      </div>
      <LoaderWrapper loading={isLoading}>
        <div>
          <div className={styles.listWrapper}>
            {pagination?.items?.length > 0
              ? pagination.items.map(i => mapItemToJSX(i))
              : <div className={styles.paginationNoItems}>No items</div>}
          </div>
        </div>
      </LoaderWrapper>
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
    </div>
  );
};

export default GenericPagination;
