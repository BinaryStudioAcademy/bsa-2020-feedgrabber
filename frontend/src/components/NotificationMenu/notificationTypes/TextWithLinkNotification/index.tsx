import React from "react";
import {INotificationProps} from "../../index";
import styles from "./styles.module.sass";
import moment from "moment";
import {Icon} from "semantic-ui-react";

const TextWithLinkNotification: React.FC<INotificationProps> = ({
                                                                    notification,
                                                                    readNotification,
                                                                    deleteNotification,
                                                                    setShown
                                                                }) => {
    return (
        <div key={notification.id}
             className={styles.notification}>
            <span className={styles.text}>{notification.text?.substr(0, 54)}</span>
            <div className={styles.date}>{moment(notification.date).fromNow()}</div>
            <div className={styles.download}
                 onClick={() => {
                     readNotification(notification.id);
                     setShown(false);
                 }}>
                <a href={notification.payload}><Icon name={"download"}></Icon></a>
            </div>
            <div className={styles.close}>
                <Icon color={"grey"} name={"close"} onClick={() => {
                    deleteNotification(notification.id);
                }}></Icon>
            </div>
            {!notification.isRead && <div className={styles.readMark}/>}
        </div>
    );
};

export default TextWithLinkNotification;

