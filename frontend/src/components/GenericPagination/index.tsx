import React, {FC, useEffect} from "react";
import ReactPaginate from 'react-paginate';

import styles from './styles.module.sass';
import {IPaginationInfo} from "../../models/IPaginationInfo";
import {IQuestionnaire} from "../../containers/QuestionnaireList/reducer";
import LoaderWrapper from "../LoaderWrapper";
import GenericButton, {IGenericButtonProps} from "./genericButton";

interface IGenericPaginationProps {
  title: string;
  isLoading: boolean;
  pagination?: IPaginationInfo<any>;
  buttons: IGenericButtonProps[];

  setPagination(pagination: IPaginationInfo<IQuestionnaire>): void;
  mapItemToJSX(item: any): JSX.Element;
  loadItems(): void;
}

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
  const handleChangePage = (page: number): void => {
    setPagination({total: 0, size: 1, items: [], page});
    loadItems();
  };

  useEffect(() => {
    if (!pagination) {
      setPagination({total: 0, page: 0, size: 1, items: []});
      loadItems();
    }
  }, [pagination, setPagination, loadItems]);

  return (
    <div className={styles.paginationWrapper}>
      <h1 className={styles.paginationTitle}>{title}</h1>
      <div className={styles.paginationButtonsWrapper}>
        {buttons.map(b => <GenericButton text={b.text} callback={b.callback} />)}
      </div>
      <LoaderWrapper loading={isLoading}>
        <div>
          <div className={styles.listWrapper}>
            {pagination && pagination.items.map(i => mapItemToJSX(i))}
          </div>
        </div>
      </LoaderWrapper>
      <div className={styles.paginationPagesWrapper}>
        <ReactPaginate
          forcePage={pagination?.page}
          onPageChange={o => handleChangePage(o.selected)}
          pageCount={pagination ? Math.ceil(pagination.total / pagination.size) : 0}
          previousLabel="<"
          nextLabel=">"
          containerClassName={styles.paginationPagesContainer}
          breakLinkClassName={styles.pageLink}
          pageLinkClassName={styles.pageLink}
          previousLinkClassName={styles.pageLink}
          nextLinkClassName={styles.pageLink}
          activeClassName={styles.pageActive}
        />
      </div>
    </div>
  );
};

export default GenericPagination;
