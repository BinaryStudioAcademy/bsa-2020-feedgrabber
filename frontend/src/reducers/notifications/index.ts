import {IAppState} from "../../models/IAppState";
import {deleteNotificationRoutine} from "../../sagas/notifications/routines";

export interface INotification {
  id: string;
  text: string;
}

export interface INotificationsState {
  notifications: INotification[];
  isLoading: boolean;
  error: string;
}

const initialState = {
  notifications: [
    {id: '1', text: 'lorem ipsum dolor sit amet...'},
    {id: '2', text: 'lorem ipsum dolor sit amet...'},
    {id: '3', text: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. QUOD CUM ACCIDISSET ' +
          'UT ALTER ALTERUM NECOPINATO VIDEREMUS, SURREXIT STATIM. HAEC PARA' +
          '/DOCA ILLI, NOS ADMIRABILIA DICAMUS. ERGO, SI SEMEL TRISTIOR EFFE' +
          'CTUS EST, HILARA VITA AMISSA EST? QUIA, SI MALA SUNT' +
          ', IS, QUI ERIT IN IIS, BEATUS NON ERIT. DUO REGES: CONSTRUCTIO INTERRETE. ID QUAERIS' +
          ', INQUAM, IN QUO, UTRUM RESPONDERO, VERSES TE HUC ATQUE ILLUC NECESSE EST.'}
  ],
  isLoading: false,
  error: null
};

const notificationReducer = (state: IAppState['notifications'] = initialState, {type, payload}) => {
  switch (type) {
    case(deleteNotificationRoutine.TRIGGER):
      return {...state,
        notifications: state.notifications.filter(notification => notification.id !== payload)
      };
    default:
      return state;
  }
};

export default notificationReducer;
