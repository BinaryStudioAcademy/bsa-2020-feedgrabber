import React from "react";
import {INotificationProps} from "../index";
import {useHistory} from "react-router-dom";
import styles from "./styles.module.sass";
import moment from "moment";
import {Button, Icon} from "semantic-ui-react";

const TextWithLinkNotification: React.FC<INotificationProps> = ({notification, deleteNotification, setShown}) => {
    const history = useHistory();
    return (
        <div key={notification.id}
             className={styles.notification}>
            <span className={styles.text}>{notification.text?.substr(0, 54)}</span>
            <div className={styles.date}>{moment(notification.date).fromNow()}</div>
            <div className={styles.download}>
                <a href={notification.link}><Icon name={"download"}></Icon></a>
            </div>
            <div className={styles.close}>
                <Icon color={"grey"} name={"close"} onClick={() => {
                    deleteNotification(notification.id);
                }}></Icon>
            </div>
        </div>
    );
};

export default TextWithLinkNotification;
