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
import moment from "moment";
import {useHistory} from "react-router-dom";

const NotificationMenu: React.FC<INotificationMenuConnectedProps> = (
    {
      isLoading,
      notifications,
      deleteNotification,
      loadNotifications,
      countNotifications
    }) => {
  const [shown, setShown] = useState(false);

  const ref = useRef(null);
  useOutsideAlerter(ref, () => shown && setShown(false));

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useStomp("notify", m => {
    toastr.success(m.body);
    loadNotifications();
  }, true);

  const history = useHistory();

  return (
      <div ref={ref}>
        <div onClick={() =>setShown(!shown)}>
          <Icon className={styles.headerBellIcon} name="bell outline" size="large"/>
          <div className={styles.headerBellMessages}>{countNotifications > 9 ? '9+' : countNotifications}</div>
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

            {
              notifications.map(notification => (
                  <div key={notification.id}
                       className={styles.notification}>
                    <div className={styles.text}
                         onClick={() => {
                           history.push(`/response/${notification.questionnaireId}`);
                           setShown(false);
                           deleteNotification(notification.responseId);
                         }}>
                      <div>{notification.text?.substr(0, 54)}</div>
                      <div className={styles.date}>{moment(notification.date).fromNow()}</div>
                    </div>
                    <div className={styles.button}
                         title='Delete'
                         onClick={() => {
                           deleteNotification(notification.responseId);
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
  loadNotifications: loadNotificationsRoutine,
  receiveNotification: receiveNotificationRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type INotificationMenuConnectedProps = ConnectedProps<typeof connector>;

export default connector(NotificationMenu);