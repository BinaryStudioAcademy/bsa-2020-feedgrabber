import {IAppState} from "../../models/IAppState";
import {
  deleteNotificationRoutine,
  loadNotificationsRoutine,
  receiveNotificationRoutine
} from "../../sagas/notifications/routines";

export interface INotification {
  id: string;
  text: string;
  date: Date;
  responseId: string;
  questionnaireId: string;
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
        notifications: state.notifications.filter(notification => notification.responseId !== payload)
      };
    case(receiveNotificationRoutine.TRIGGER):
      return {
        ...state,
        notifications: [...state.notifications, payload]
      };
    default:
      return state;
  }
};

export default notificationReducer;
