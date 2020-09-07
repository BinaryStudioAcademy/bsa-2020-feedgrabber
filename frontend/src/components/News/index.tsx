import {Icon} from "semantic-ui-react";
import React from "react";
import { INewsItem} from 'models/news';
import {useTranslation} from "react-i18next";
import styles from './styles.module.scss';

interface INewsProps {
    item: INewsItem;
    setCurrentNews?(payload: any): void;
}

const News: React.FC<INewsProps> = ({ item, setCurrentNews}) => {
    const [t] = useTranslation();
    return (
        <>
            {item.image? <img src={item.image} alt=''
                              height="240" width="180"/> : <div/>} {/* scale 4:3 * 60*/}
            <div className={styles.detailsContainer}>
                <div className={styles.type}>{item.type}</div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.body}>{item.body}</div>
                <div className={item.image ? styles.authorContainer : styles.authorContainerRight}>
                {item.user.avatar ? <img src={item.user.avatar} alt='avatar'
                                         height="50" width="50"/> : null}
                    <div className={styles.detailsContainer}>
                        <div className={styles.userName}>{item.user.username}</div>
                        <div className={styles.date}>{item.date}</div>
                    </div>
                </div>
                <div className={styles.icons}>
                    <span className={styles.comments} onClick={() => setCurrentNews({ ...item })}>
                        <Icon name="comment" />
                        {item.commentsCount} {item.commentsCount === 1 ? t("comment") : t("comments")}
                    </span>
                </div>
            </div>
        </>
    );
};

export default News;
