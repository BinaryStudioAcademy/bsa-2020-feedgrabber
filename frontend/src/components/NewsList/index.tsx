import React from 'react';
import styles from './styles.module.scss';
import UICardBlock from 'components/UI/UICardBlock';
import { INewsItem } from 'models/news';

interface INewsFeedProps {
    newsList: INewsItem[];
}

// mock
const defaultProps: INewsFeedProps = {
    newsList: [
        {id: "1",
        title: "Announcing a free plan for small teams",
        image:
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        type: "Announcements",
        body: "At wake, our mission has always been focused on bringing openness.",
        author: {
            id: "1",
            username: "Hanna Wolfe",
            avatar: "https://cdn3.iconfinder.com/data/icons/avatars-collection/256/02-512.png"
        },
        date: "Feb 4, 2020"
    }
    ]
};

const getNewsItem = (item: INewsItem) => {
    return (
        <UICardBlock key={item.id}
        className={styles.newsItemContainer}>
            <img src={item.image} alt='image'
            height="240" width="180"/> {/* scale 4:3 * 60*/}
            <div className={styles.detailesContainer}>
                <div className={styles.type}>{item.type}</div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.body}>{item.body}</div>
                <div className={styles.authorContainer}>
                    <img src={item.author.avatar} alt='avatar'
                    height="50" width="50"/>
                    <div className={styles.detailesContainer}>
                        <div className={styles.userName}>{item.author.username}</div>
                        <div className={styles.date}>{item.date}</div>
                    </div>
                </div>
            </div>
        </UICardBlock>
    );
};

const NewsList: React.FC<INewsFeedProps> = ({newsList}) => {
    return (
        <div className={styles.newsFeedContainer}>
            <div className={styles.newsListMain}>
                {newsList.map(item => getNewsItem(item))}
            </div>
        </div>
    );
};

NewsList.defaultProps = defaultProps;

export default NewsList;