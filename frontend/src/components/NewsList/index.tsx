import React from 'react';
import styles from './styles.module.scss';
import UICardBlock from 'components/UI/UICardBlock';
import { INewsItem} from 'models/news';
import { connect } from 'react-redux';
import { IAppState } from 'models/IAppState';
import { loadNewsListRoutine, setNewsPaginationRoutine } from 'sagas/news/routines';
import GenericPagination from 'components/GenericPagination';
import { IPaginationInfo } from 'models/IPaginationInfo';
import News from "../News";

interface INewsFeedProps {
    pagination?: IPaginationInfo<INewsItem>;
    isLoading?: boolean;
    loadNews?(): void;
    setPagination?(pagination: IPaginationInfo<INewsItem>): void;
}

const NewsList: React.FC<INewsFeedProps> = ({pagination, isLoading, loadNews, setPagination}) => {
    const getNewsItem = (item: INewsItem) => {
        return (
            <UICardBlock key={item.id}
                         className={styles.newsItemContainer}>
                <News item={item} />
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
        </div>
    );
};

const mapStateToProps = (state: IAppState) => ({
    pagination: state.news.list.pagination,
    isLoading: state.news.list.isLoading
});

const mapDispatchToProps = {
    loadNews: loadNewsListRoutine,
    setPagination: setNewsPaginationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
