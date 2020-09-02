import React from "react";
import {INotificationProps} from "../../index";
import styles from './styles.module.sass';
import {useHistory} from "react-router-dom";
import moment from "moment";
import {Icon} from "semantic-ui-react";

const RequestNotification: React.FC<INotificationProps> = ({
                                                               notification,
                                                               deleteNotification,
                                                               getResponse,
                                                               readNotification, setShown
                                                           }) => {
    const history = useHistory();
    return (
        <div key={notification.id}
             className={styles.notification}>
                <span className={styles.text} onClick={() => {
                    getResponse(notification.requestId);
                    history.push(`/response/${notification.questionnaireId}`);
                    readNotification(notification.id);
                    setShown(false);
                }}>{notification.text?.substr(0, 54)}</span>
            <div className={styles.date}>
                { moment(notification.date).fromNow()}
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

export default RequestNotification;

