import React from 'react';
import styles from './styles.module.scss';
import UICardBlock from 'components/UI/UICardBlock';
import { INewsItem} from 'models/news';
import { connect } from 'react-redux';
import { IAppState } from 'models/IAppState';
import { loadNewsListRoutine, setNewsPaginationRoutine } from 'sagas/news/routines';
import GenericPagination from 'components/helpers/GenericPagination';
import { IPaginationInfo } from 'models/IPaginationInfo';

interface INewsFeedProps {
    pagination?: IPaginationInfo<INewsItem>;
    isLoading?: boolean;
    loadNews?(): void;
    setPagination?(pagination: IPaginationInfo<INewsItem>): void;
}

const getNewsItem = (item: INewsItem) => {
    return (
        <UICardBlock key={item.id}
        className={styles.newsItemContainer}>
            {item.image? <img src={item.image} alt=''
            height="240" width="180"/> : <div/>} {/* scale 4:3 * 60*/}
            <div className={styles.detailesContainer}>
                <div className={styles.type}>{item.type}</div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.body}>{item.body}</div>
                <div className={item.image ? styles.authorContainer : styles.authorContainerRight}>
                {item.user.avatar ? <img src={item.user.avatar} alt='avatar'
                    height="50" width="50"/> : null}
                    <div className={styles.detailesContainer}>
                        <div className={styles.userName}>{item.user.username}</div>
                        <div className={styles.date}>{item.date}</div>
                    </div>
                </div>
            </div>
        </UICardBlock>
    );
};

const NewsList: React.FC<INewsFeedProps> = ({pagination, isLoading, loadNews, setPagination}) => {

    return (
        <div className={styles.newsFeedContainer}>
            <div className={styles.newsListMain}>
                <GenericPagination
                isLoading={isLoading}
                loadItems={loadNews}
                pagination={pagination}
                setPagination={setPagination}
                mapItemToJSX={getNewsItem}
                ></GenericPagination>
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
