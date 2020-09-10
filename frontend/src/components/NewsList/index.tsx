import React from 'react';
import { useTranslation } from "react-i18next";
import { ICompanyFeedItem } from 'models/companyFeed/ICompanyFeedItem';
import { connect } from 'react-redux';
import { IAppState } from 'models/IAppState';
import {
    applyReactionRoutine,
    loadCompanyFeedRoutine,
    reactOnNewsRoutine,
    setCompanyFeedPaginationRoutine, setExpandedImageRoutine
} from 'sagas/companyFeed/routines';
import GenericPagination from 'components/helpers/GenericPagination';
import { IPaginationInfo } from 'models/IPaginationInfo';
import {Button, Image, Modal} from 'semantic-ui-react';
import { Permissions } from "../helpers/AccessManager/rbac-rules";
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import NewsItem, {ICreatedReactionDto, IReactionCreationDto} from "../NewsItem/NewsItem";
import AccessManager from "../helpers/AccessManager";
import UIButton from "../UI/UIButton";

interface INewsFeedProps {
  pagination?: IPaginationInfo<ICompanyFeedItem>;
  openedImage: string;
  isLoading?: boolean;

  expandImage(imageUrl: string): void;
  loadNews?(): void;
  reactOnNews(reaction: IReactionCreationDto): void;
  setPagination?(pagination: IPaginationInfo<ICompanyFeedItem>): void;
  applyReaction(reaction: ICreatedReactionDto): void;
}

const NewsList: React.FC<INewsFeedProps> = ({
  pagination,
  openedImage,
  isLoading,
  loadNews,
  setPagination,
  reactOnNews,
  applyReaction,
  expandImage
}) => {

  const [t] = useTranslation();

  return (
    <div className={styles.newsItemContainer}>
      <AccessManager staticPermission={Permissions.createPostsAndPolls}>
        <Link to="/company/new">
          <div style={{ marginLeft: "1em" }}><UIButton primary title={t('Add news')}/></div>
        </Link>
      </AccessManager>
      <div className={styles.newsListMain}>
        <GenericPagination
          isLoading={isLoading}
          loadItems={loadNews}
          pagination={pagination}
          setPagination={setPagination}
          mapItemToJSX={(item: ICompanyFeedItem) => (
              <NewsItem expandImage={expandImage} applyReaction={applyReaction} react={reactOnNews} item={item}/>
              )
          }
        />
      </div>
      <Modal
        basic
        onClose={() => expandImage(null)}
        open={!!openedImage}
        size='small'
      >
        <Modal.Content className={styles.expandedImageContainer}>
            <img className={styles.expandedImage} src={openedImage}/>
        </Modal.Content>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  pagination: state.companyFeed.list,
  isLoading: state.companyFeed.isLoading,
  openedImage: state.companyFeed.expandedImageUrl
});

const mapDispatchToProps = {
  loadNews: loadCompanyFeedRoutine,
  reactOnNews: reactOnNewsRoutine,
  applyReaction: applyReactionRoutine,
  expandImage: setExpandedImageRoutine,
  setPagination: setCompanyFeedPaginationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
