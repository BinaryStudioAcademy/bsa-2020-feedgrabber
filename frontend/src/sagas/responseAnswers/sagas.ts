import {all, call, put, takeEvery, select} from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import apiClient from '../../helpers/apiClient';
import { IGeneric } from 'models/IGeneric';
import { IAnswer } from 'models/forms/responseAnswers/types';
import { saveAnswersRoutine } from './routines';

function* saveAll(action: any) {
    try {
      console.log(action.payload);
        const res: IGeneric<IAnswer<any>> = yield call(apiClient.post,
           `http://localhost:5000/api/answers/list`, action.payload);
        yield put(saveAnswersRoutine.success(res.data.data));
      } catch (error) {
        yield put(saveAnswersRoutine.failure());
        toastr.error("Couldn't save answers");
      }
}

export default function* answersSagas() {
    yield takeEvery(saveAnswersRoutine.TRIGGER, saveAll);
}