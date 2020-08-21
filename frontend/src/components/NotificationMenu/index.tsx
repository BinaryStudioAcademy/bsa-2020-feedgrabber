import React, {useEffect, useRef} from "react";
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

interface INotificationMenuProps {
  shown?: boolean;
  callback: () => void;
}

const NotificationMenu: React.FC<INotificationMenuProps & INotificationMenuConnectedProps> = (
    {
      shown,
      isLoading,
      notifications,
      deleteNotification,
      loadNotifications,
      receiveNotification,
      callback
    }) => {
  const ref = useRef(null);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useOutsideAlerter(ref, callback);

  useStomp("alert", m => {
    toastr.success(m.body);
    console.log(m.body, m.headers, m.binaryBody);
    receiveNotification(m.body);
  }, true);

  return (
      <div ref={ref}>
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
                           // go to response view
                           // deleteNotification(notification.id);
                         }}>
                      {notification.text.substr(0, 54)}
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
  isLoading: state.notifications.isLoading
});

const mapDispatchToProps = {
  deleteNotification: deleteNotificationRoutine,
  loadNotifications: loadNotificationsRoutine,
  receiveNotification: receiveNotificationRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type INotificationMenuConnectedProps = ConnectedProps<typeof connector>;

export default connector(NotificationMenu);