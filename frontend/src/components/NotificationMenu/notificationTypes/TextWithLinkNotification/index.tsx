import React from "react";
import {INotificationProps} from "../../index";
import {useHistory} from "react-router-dom";
import styles from "./styles.module.sass";
import moment from "moment";
import {Icon} from "semantic-ui-react";

const TextWithLinkNotification: React.FC<INotificationProps> = ({notification, deleteNotification, setShown}) => {
    const history = useHistory();
    return (
        <div key={notification.id}
             className={styles.notification}>
            <span className={styles.text}>{notification.text?.substr(0, 54)}</span>
            <div className={styles.date}>{moment(notification.date).fromNow()}</div>
            <div className={styles.download}>
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

/*
<div className={styles.text}
     onClick={() => {
         history.push(`/response/${notification.questionnaireId}`);
         deleteNotification(notification.id);
         setShown(false);
     }}>
    <div>{notification.text?.substr(0, 54)}</div>
    <div className={styles.date}>{moment(notification.date).fromNow()}</div>
    <a href={notification.payload}>Download</a>
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
{!notification.isRead && <div className={styles.readMark}/>}*/
