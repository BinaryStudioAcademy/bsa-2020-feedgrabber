import React, {useEffect, useRef, useState} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import styles from './styles.module.sass';
import {
    deleteAllNotificationsRoutine,
    deleteNotificationRoutine,
    loadNotificationsRoutine,
    receiveNotificationRoutine,
    markNotificationAsReadRoutine
} from "../../sagas/notifications/routines";
import LoaderWrapper from "../LoaderWrapper";
import {useStomp} from "../../helpers/websocket.helper";
import {toastr} from 'react-redux-toastr';
import useOutsideAlerter from "../../helpers/outsideClick.hook";
import {Icon} from "semantic-ui-react";
import moment from "moment";
import {useHistory} from "react-router-dom";
import {getResponseRoutine} from "../../sagas/response/routines";
import {INotification} from "../../reducers/notifications";

export enum MessageTypes {
    plainText = 'plain_text',
    textWithLink = 'text_with_link'
}

const NotificationMenu: React.FC<INotificationMenuConnectedProps> = (
    {
        isLoading,
        notifications,
        deleteNotification,
        deleteAll,
        loadNotifications,
        receiveNotification,
        countNotifications,
        getResponse,
        readNotification
    }) => {
    const [shown, setShown] = useState(false);

    const ref = useRef(null);
    useOutsideAlerter(ref, () => shown && setShown(false));

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    useStomp("notify", m => {
        const notification: INotification = JSON.parse(m.body);
        receiveNotification(notification);
        toastr.info(notification.text);
    }, true);

    const history = useHistory();

    return (
        <div ref={ref}>
            <div onClick={() => setShown(!shown)}>
                <Icon className={styles.headerBellIcon} name="bell outline" size="large"/>
                {countNotifications > 0 &&
                (<div className={styles.headerBellMessages}>
                    {countNotifications > 9 ? '9+' : countNotifications}
                </div>)}
            </div>
            {shown &&
            <div className={styles.notificationsContainer}>
                <div className={`${styles.header} ${styles.notifyHeader}`}><h4>Notifications</h4>
                    {notifications.length > 1 &&
                    <Icon
                        className={styles.removeAll}
                        name='trash alternate'
                        onClick={deleteAll}
                        link/>}</div>
                <LoaderWrapper loading={isLoading}>
                    {
                        notifications.length === 0 &&
                        <div className={styles.noNotifications}>
                            No notifications yet(
                        </div>
                    }
                    {
                        notifications.map(notification => (
                            <div key={notification.id}
                                 className={styles.notification}>
                                <div className={styles.text}
                                     onClick={() => {
                                         getResponse(notification.requestId);
                                         history.push(`/response/${notification.questionnaireId}`);
                                         readNotification(notification.id);
                                         setShown(false);
                                     }}>
                                    <div>{notification.text?.substr(0, 54)}</div>
                                    <div className={styles.date}>{moment(notification.date).fromNow()}</div>
                                </div>
                                <div className={styles.button}
                                     title='Delete'
                                     onClick={() => {
                                         deleteNotification(notification.id);
                                     }}>
                                    <div>
                                        x
                                    </div>
                                </div>
                                {!notification.isRead && <div className={styles.readMark}/>}
                            </div>
                        ))}
                </LoaderWrapper>
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state: IAppState) => ({
    notifications: state.notifications.notifications,
    isLoading: state.notifications.isLoading,
    countNotifications: state.notifications.notifications.length

});

const mapDispatchToProps = {
    deleteNotification: deleteNotificationRoutine,
    deleteAll: deleteAllNotificationsRoutine,
    loadNotifications: loadNotificationsRoutine,
    receiveNotification: receiveNotificationRoutine,
    getResponse: getResponseRoutine,
    readNotification: markNotificationAsReadRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type INotificationMenuConnectedProps = ConnectedProps<typeof connector>;

export default connector(NotificationMenu);
