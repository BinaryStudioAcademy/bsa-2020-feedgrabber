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
import LoaderWrapper from "../helpers/LoaderWrapper";
import {useStomp} from "../../helpers/websocket.helper";
import {toastr} from 'react-redux-toastr';
import useOutsideAlerter from "../../helpers/outsideClick.hook";
import {Icon} from "semantic-ui-react";
import {INotification} from "../../reducers/notifications";
import {useTranslation} from "react-i18next";
import RequestNotification from "./notificationTypes/RequestNotification";
import ReportsNotification from "./notificationTypes/ReportsNotification";
import {loadResponseFormRoutine} from "../../sagas/response/routines";

export enum MessageTypes {
    plainText = 'plain_text',
    reports = 'reports'
}

export interface INotificationProps {
    notification: INotification;

    deleteNotification(id: string): void;

    setShown(value: boolean): void;

    readNotification(id: string): void;

    getResponse(id: string): void;
}

const NotificationMenu: React.FC<INotificationMenuConnectedProps> = (
    {
        isLoading,
        notifications,
        deleteNotification,
        deleteAll,
        loadNotifications,
        receiveNotification,
        getResponse,
        readNotification
    }) => {
    const [t] = useTranslation();
    const [shown, setShown] = useState(false);

    const ref = useRef(null);
    useOutsideAlerter(ref, () => shown && setShown(false));

    const countUnreadNotifications = notifications.filter(n => !n.isRead).length;

    const getNotification = (notification: INotification) => {
        switch (notification.messageType) {
            case MessageTypes.plainText:
                return (<RequestNotification
                    key ={notification.id}
                    notification={notification}
                    deleteNotification={deleteNotification}
                    readNotification={readNotification}
                    getResponse={getResponse}
                    setShown={setShown}/>);
            case MessageTypes.reports:
                return (<ReportsNotification
                    key ={notification.id}
                    notification={notification}
                    deleteNotification={deleteNotification}
                    getResponse={getResponse}
                    readNotification={readNotification}
                    setShown={setShown}/>);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    useStomp("notify", m => {
        const notification: INotification = JSON.parse(m.body);
        receiveNotification(notification);
        toastr.info(notification.text);
    }, true);

    return (
        <div ref={ref}>
            <div onClick={() => setShown(!shown)}>
                <Icon className={styles.headerBellIcon} name="bell outline" size="large"/>
                {countUnreadNotifications > 0 &&
                (<div className={styles.headerBellMessages}>
                    {countUnreadNotifications > 9 ? '9+' : countUnreadNotifications}
                </div>)}
            </div>
            {shown &&
            <div className={styles.notificationsContainer}>
                <div className={`${styles.header} ${styles.notifyHeader}`}><h4>{t("Notifications")}</h4>
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
                            {t("No notifications yet")}
                        </div>
                    }
                    {
                        notifications.map(notification => getNotification(notification))
                    }
                </LoaderWrapper>
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state: IAppState) => ({
    notifications: state.notifications.notifications,
    isLoading: state.notifications.isLoading
});

const mapDispatchToProps = {
    deleteNotification: deleteNotificationRoutine,
    deleteAll: deleteAllNotificationsRoutine,
    loadNotifications: loadNotificationsRoutine,
    receiveNotification: receiveNotificationRoutine,
    getResponse: loadResponseFormRoutine,
    readNotification: markNotificationAsReadRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type INotificationMenuConnectedProps = ConnectedProps<typeof connector>;

export default connector(NotificationMenu);
