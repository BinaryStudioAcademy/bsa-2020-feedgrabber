import React from 'react';
import { useTranslation } from "react-i18next";
import { ICompanyFeedItem } from 'models/companyFeed/ICompanyFeedItem';
import { connect } from 'react-redux';
import { IAppState } from 'models/IAppState';
import {
  applyReactionRoutine,
  loadCompanyFeedRoutine,
  reactOnNewsRoutine,
  setCompanyFeedPaginationRoutine
} from 'sagas/companyFeed/routines';
import GenericPagination from 'components/helpers/GenericPagination';
import { IPaginationInfo } from 'models/IPaginationInfo';
import { Permissions } from "../helpers/AccessManager/rbac-rules";
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import NewsItem, {ICreatedReactionDto, IReactionCreationDto} from "../NewsItem/NewsItem";
import AccessManager from "../helpers/AccessManager";
import UIButton from "../UI/UIButton";

interface INewsFeedProps {
  pagination?: IPaginationInfo<ICompanyFeedItem>;
  isLoading?: boolean;
  loadNews?(): void;

  reactOnNews(reaction: IReactionCreationDto): void;
  setPagination?(pagination: IPaginationInfo<ICompanyFeedItem>): void;
  applyReaction(reaction: ICreatedReactionDto): void;
}

const NewsList: React.FC<INewsFeedProps> = ({
  pagination,
  isLoading,
  loadNews,
  setPagination,
  reactOnNews,
  applyReaction
}) => {

  const [t] = useTranslation();

  return (
    <div className={styles.newsItemContainer}>
      <AccessManager staticPermission={Permissions.createPostsAndPolls}>
        <Link to="/company/new">
          <UIButton primary title={t('Add news')}/>
        </Link>
      </AccessManager>
      <div className={styles.newsListMain}>
        <GenericPagination
          isLoading={isLoading}
          loadItems={loadNews}
          pagination={pagination}
          setPagination={setPagination}
          mapItemToJSX={(item: ICompanyFeedItem) => (
              <NewsItem applyReaction={applyReaction} react={reactOnNews} item={item}/>
              )
          }
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  pagination: state.companyFeed.list,
  isLoading: state.companyFeed.isLoading
});

const mapDispatchToProps = {
  loadNews: loadCompanyFeedRoutine,
  reactOnNews: reactOnNewsRoutine,
  applyReaction: applyReactionRoutine,
  setPagination: setCompanyFeedPaginationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
