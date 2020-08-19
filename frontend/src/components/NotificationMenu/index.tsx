import React from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import styles from './styles.module.sass';
import {deleteNotificationRoutine} from "../../sagas/notifications/routines";
import LoaderWrapper from "../LoaderWrapper";

interface INotificationMenuProps {
  shown?: boolean;
}

const NotificationMenu: React.FC<INotificationMenuProps & INotificationMenuConnectedProps> = (
    {
      shown,
      isLoading,
      notifications,
      deleteNotification
    }) => {
  return (
      <>
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
                           deleteNotification(notification.id);
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
      </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  notifications: state.notifications.notifications,
  isLoading: state.notifications.isLoading
});

const mapDispatchToProps = {
  deleteNotification: deleteNotificationRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type INotificationMenuConnectedProps = ConnectedProps<typeof connector>;

export default connector(NotificationMenu);