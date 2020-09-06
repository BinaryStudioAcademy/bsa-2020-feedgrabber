import React from 'react';
import { useTranslation } from "react-i18next";
import { Permissions } from "../AccessManager/rbac-rules";
import AccessManager from "../AccessManager";
import UICardBlock from 'components/UI/UICardBlock';
import { ICompanyFeedItem } from 'models/companyFeed/ICompanyFeedItem';
import { connect } from 'react-redux';
import { IAppState } from 'models/IAppState';
import { loadCompanyFeedRoutine, setCompanyFeedPaginationRoutine } from 'sagas/companyFeed/routines';
import GenericPagination from 'components/GenericPagination';
import { IPaginationInfo } from 'models/IPaginationInfo';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

interface INewsFeedProps {
  pagination?: IPaginationInfo<ICompanyFeedItem>;
  isLoading?: boolean;
  loadNews?(): void;
  setPagination?(pagination: IPaginationInfo<ICompanyFeedItem>): void;
}

const getNewsItem = (item: ICompanyFeedItem) => {
  return (
    <UICardBlock key={item.id}
                 className={styles.newsItemContainer}>
      {item.image
        ? <img src={item.image.link} alt='' height="240" width="180"/>
        : <div/>
      } {/* scale 4:3 * 60*/}
      <div className={styles.detailesContainer}>
        <div className={styles.type}>{item.type}</div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.body}>{item.body}</div>
        <div className={item.image ? styles.authorContainer : styles.authorContainerRight}>
          {item.user.avatar
            ? <img src={item.user.avatar} alt='avatar' height="50" width="50"/>
            : null
          }
          <div className={styles.detailesContainer}>
            <div className={styles.userName}>{item.user.username}</div>
            <div className={styles.date}>{item.createdAt}</div>
          </div>
        </div>
      </div>
    </UICardBlock>
  );
};

const NewsList: React.FC<INewsFeedProps> = ({
  pagination,
  isLoading,
  loadNews,
  setPagination
}) => {
  const [t] = useTranslation();
  return (
    <div className={styles.newsItemContainer}>
      <AccessManager staticPermission={Permissions.createPostsAndPolls}>
        <Link to="/company/new">
          <Button>{t('Add news')}</Button>
        </Link>
      </AccessManager>
      <div className={styles.newsListMain}>
        <GenericPagination
          isLoading={isLoading}
          loadItems={loadNews}
          pagination={pagination}
          setPagination={setPagination}
          mapItemToJSX={getNewsItem} />
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
  setPagination: setCompanyFeedPaginationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
