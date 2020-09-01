import React, {useEffect, useRef, useState} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import styles from './styles.module.sass';
import {
    deleteAllNotificationsRoutine,
    deleteNotificationRoutine,
    loadNotificationsRoutine,
    receiveNotificationRoutine
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
import {useTranslation} from "react-i18next";

const NotificationMenu: React.FC<INotificationMenuConnectedProps> = (
    {
        isLoading,
        notifications,
        deleteNotification,
        deleteAll,
        loadNotifications,
        receiveNotification,
        countNotifications,
        getResponse
    }) => {
    const [t] = useTranslation();
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
                        notifications.map(notification => (
                            <div key={notification.id}
                                 className={styles.notification}>
                                <div className={styles.text}
                                     onClick={() => {
                                         getResponse(notification.requestId);
                                         history.push(`/response/${notification.questionnaireId}`);
                                         deleteNotification(notification.requestId);
                                         setShown(false);
                                     }}>
                                    <div>{notification.text?.substr(0, 54)}</div>
                                    <div className={styles.date}>{moment(notification.date).fromNow()}</div>
                                </div>
                                <div className={styles.button}
                                     title='Delete'
                                     onClick={() => {
                                         deleteNotification(notification.requestId);
                                     }}
                                >
                                    <div>
                                        x
                                    </div>
                                </div>
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
    getResponse: getResponseRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type INotificationMenuConnectedProps = ConnectedProps<typeof connector>;

export default connector(NotificationMenu);
