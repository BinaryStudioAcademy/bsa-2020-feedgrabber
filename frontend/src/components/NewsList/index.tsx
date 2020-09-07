import React from 'react';
import styles from './styles.module.scss';
import UICardBlock from 'components/UI/UICardBlock';
import { INewsItem} from 'models/news';
import { connect } from 'react-redux';
import { IAppState } from 'models/IAppState';
import {loadNewsListRoutine, setCurrentNewsRoutine, setNewsPaginationRoutine} from 'sagas/news/routines';
import GenericPagination from 'components/GenericPagination';
import { IPaginationInfo } from 'models/IPaginationInfo';
import News from "../News";
import ExpandedNews from "../ExpandedNews";

interface INewsFeedProps {
    pagination?: IPaginationInfo<INewsItem>;
    isLoading?: boolean;
    loadNews?(): void;
    setPagination?(pagination: IPaginationInfo<INewsItem>): void;
    currentNews: INewsItem;
    setCurrentNews?(payload: any): void;
    loadComments?(payload: { newsId: string }): void;
}

const NewsList: React.FC<INewsFeedProps> =
    ({
         pagination,
         isLoading,
         loadNews,
         setPagination,
         setCurrentNews,
         currentNews
    }) => {
    const getNewsItem = (news: INewsItem) => {
        return (
            <UICardBlock key={news.id}
                         className={styles.newsItemContainer}>
                <News item={news} setCurrentNews={setCurrentNews} />
            </UICardBlock>
        );
    };

    return (
        <div className={styles.newsFeedContainer}>
            <div className={styles.newsListMain}>
                <GenericPagination
                isLoading={isLoading}
                loadItems={loadNews}
                pagination={pagination}
                setPagination={setPagination}
                mapItemToJSX={getNewsItem}
                />
            </div>
            {currentNews?.id && <ExpandedNews />}
        </div>
    );
};

const mapStateToProps = (state: IAppState) => ({
    pagination: state.news.list.pagination,
    isLoading: state.news.list.isLoading,
    currentNews: state.news.current.get
});

const mapDispatchToProps = {
    loadNews: loadNewsListRoutine,
    setPagination: setNewsPaginationRoutine,
    setCurrentNews: setCurrentNewsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
