import React from "react";
import {INotificationProps} from "../index";
import {useHistory} from "react-router-dom";
import styles from "../PlainTextNotification/styles.module.sass";
import moment from "moment";

const TextWithLinkNotification: React.FC<INotificationProps> = ({notification, deleteNotification, setShown}) => {
    const history = useHistory();
    return (
        <div key={notification.id}
             className={styles.notification}>
            <div className={styles.text}
                 onClick={() => {
                     history.push(`/response/${notification.questionnaireId}`);
                     deleteNotification(notification.id);
                     setShown(false);
                 }}>
                <div>{notification.text?.substr(0, 54)}</div>
                <div className={styles.date}>{moment(notification.date).fromNow()}</div>
                <a href={notification.link}>Download</a>
            </div>
            <div className={styles.button}
                 title='Delete'
                 onClick={() => {
                     deleteNotification(notification.id);
                 }}
            >
                <div>
                    x
                </div>
            </div>
        </div>
    );
};

export default TextWithLinkNotification;
