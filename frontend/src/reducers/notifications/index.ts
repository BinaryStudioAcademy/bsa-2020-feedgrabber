import {IAppState} from "../../models/IAppState";
import {
  deleteAllNotificationsRoutine,
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
  responseId: string;
  questionnaireId: string;
  messageType: MessageTypes;
  payload?: string;
  isRead: boolean;
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
      case(deleteAllNotificationsRoutine.TRIGGER):
      return {
        ...state,
        notifications: []
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
