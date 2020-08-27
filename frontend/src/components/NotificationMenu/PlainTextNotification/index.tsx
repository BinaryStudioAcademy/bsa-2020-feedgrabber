import React from "react";
import {INotificationProps} from "../index";
import styles from './styles.module.sass';
import {useHistory} from "react-router-dom";
import moment from "moment";

const PlainTextNotification: React.FC<INotificationProps> = ({notification, deleteNotification, setShown}) => {
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

export default PlainTextNotification;
