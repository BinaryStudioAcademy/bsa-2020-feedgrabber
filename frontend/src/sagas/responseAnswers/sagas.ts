import {all, call, put, takeEvery, select} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import apiClient from '../../helpers/apiClient';
import { IGeneric } from 'models/IGeneric';
import { IAnswer } from 'models/forms/responseQuestionnaire/types';
import { saveAnswersRoutine } from './routines';

function* save(action: any) {
    try {
        const res: IGeneric<IAnswer> = yield call(apiClient.post, `api/answers`, action.payload);
        yield put(saveAnswersRoutine.success(res.data.data));
      } catch (error) {
        yield put(saveAnswersRoutine.failure());
        toastr.error(error);
      }
}

export default function* questionnairesSagas() {
    yield all([
      yield takeEvery(saveAnswersRoutine.TRIGGER, save)
    ]);
  }