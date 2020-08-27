import {IAppState} from "../../models/IAppState";
import {
  deleteNotificationRoutine,
  loadNotificationsRoutine,
  receiveNotificationRoutine
} from "../../sagas/notifications/routines";
import {MessageTypes} from "../../components/NotificationMenu";

export interface INotification {
  id: string;
  text: string;
  date: Date;
  requestId: string;
  questionnaireId: string;
  type: MessageTypes;
  link?: string;
}

export interface INotificationsState {
  notifications: INotification[];
  isLoading: boolean;
  error: string;
}

const initialState = {
  notifications: [],
  isLoading: false,
  error: null
};

const notificationReducer = (state: IAppState['notifications'] = initialState, {type, payload}) => {
  switch (type) {
    case(loadNotificationsRoutine.TRIGGER):
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case(loadNotificationsRoutine.SUCCESS):
      return {
        notifications: payload,
        isLoading: false,
        error: null
      };
    case(loadNotificationsRoutine.FAILURE):
      return {
        ...state,
        error: payload
      };
    case(deleteNotificationRoutine.TRIGGER):
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== payload)
      };
    case(receiveNotificationRoutine.TRIGGER):
      return {
        ...state,
        notifications: [payload, ...state.notifications]
      };
    default:
      return state;
  }
};

export default notificationReducer;
