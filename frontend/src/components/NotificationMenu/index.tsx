import React, {useEffect, useRef, useState} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import styles from './styles.module.sass';
import {
    deleteNotificationRoutine,
    loadNotificationsRoutine,
    receiveNotificationRoutine
} from "../../sagas/notifications/routines";
import LoaderWrapper from "../LoaderWrapper";
import {useStomp} from "../../helpers/websocket.helper";
import {toastr} from 'react-redux-toastr';
import useOutsideAlerter from "../../helpers/outsideClick.hook";
import {Icon} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import {getResponseRoutine} from "../../sagas/response/routines";
import {INotification} from "../../reducers/notifications";
import PlainTextNotification from "./PlainTextNotification";
import TextWithLinkNotification from "./TextWithLinkNotification";

export enum MessageTypes {
    plainText = 'plain_text',
    textWithLink = 'text_with_link'
}

export interface INotificationProps {
    notification: INotification;

    deleteNotification(id: string): void;

    setShown(value: boolean): void;
}

const NotificationMenu: React.FC<INotificationMenuConnectedProps> = (
    {
        isLoading,
        notifications,
        deleteNotification,
        loadNotifications,
        receiveNotification,
        countNotifications,
        getResponse
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

    const getNotification = (notification: INotification) => {
        switch (notification.messageType) {
            case MessageTypes.plainText:
                return (<PlainTextNotification
                    notification={notification}
                    deleteNotification={deleteNotification}
                    setShown={setShown}/>);
            case MessageTypes.textWithLink:
                return (<TextWithLinkNotification
                    notification={notification}
                    deleteNotification={deleteNotification}
                    setShown={setShown}/>);
        }
    };
console.log(notifications);
    return (
        <div ref={ref}>
            <div onClick={() => setShown(!shown)}>
                <Icon className={styles.headerBellIcon} name="bell outline" size="large"/>
                {countNotifications &&
                <div className={styles.headerBellMessages}>
                    {countNotifications > 9 ? '9+' : countNotifications}
                </div>}
            </div>
            {shown &&
            <div className={styles.notificationsContainer}>
                <div className={styles.header}><h4>Notifications</h4></div>
                <LoaderWrapper loading={isLoading}>
                    {
                        notifications.length === 0 &&
                        <div className={styles.noNotifications}>
                            No notifications yet(
                        </div>
                    }

                    {notifications.map(notification => getNotification(notification))}
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
    loadNotifications: loadNotificationsRoutine,
    receiveNotification: receiveNotificationRoutine,
    getResponse: getResponseRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type INotificationMenuConnectedProps = ConnectedProps<typeof connector>;

export default connector(NotificationMenu);
