import { Routine } from 'redux-saga-routines';
import { fetchDataRoutine } from 'screens/Home/routines';
import { IData } from 'screens/Home/models/IData';

export const data = (state: IData = { message: 'Empty string' }, action: Routine<any>) => {
  switch (action.type) {
    case fetchDataRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
