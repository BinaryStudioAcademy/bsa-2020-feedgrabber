import { all, call, put, takeEvery } from 'redux-saga/effects';
import apiClient from "../../helpers/apiClient";
import { toastr } from 'react-redux-toastr';
import {
  loadCompanyFeedRoutine,
  loadCompanyFeedItemRoutine,
  saveCompanyFeedItemRoutine,
  createCompanyFeedItemRoutine
} from './routines';
import { ICompanyFeedItem } from '../../models/companyFeed/ICompanyFeedItem';

const defaultItem = {
  title: '',
  body: '',
  imageId: null,
  createdAt: new Date().toLocaleString(),
  type: '',
  user: { id: '', username: '' }
} as ICompanyFeedItem;

const feedItemMock = {
  id: '1',
  title: 'Demo is coming...',
  body: 'Hello everybody. Today I would like to talk about our deadline. ' +
        'So, we know that the demo will be on 02.09.2020.',
  imageId: 'fd876825-ba11-4113-bdf7-02cb2c572be9',
  createdAt: new Date().toLocaleString(),
  type: '',
  user: { id: '11', username: 'mark' }
};

function* loadCompanyFeed() {
  try {
	const res = yield call(apiClient.get, '/api/news');
    yield put(loadCompanyFeedRoutine.success(res.data.data));
  } catch (error) {
    yield put(loadCompanyFeedRoutine.failure());
    toastr.error('Unable to load company feed');
  }
}

function* loadCompanyFeedItem(action) {
  try {
    const id = action.payload;
    if (!id) {
      // return defaultItem
      yield put(loadCompanyFeedItemRoutine.success(defaultItem));
      return;
    }
    // here will be api-call
    yield put(loadCompanyFeedItemRoutine.success(feedItemMock));
  } catch (error) {
    yield put(loadCompanyFeedItemRoutine.failure());
    toastr.error('Can not load feed');
  }
}

function* createCompanyFeedItem(action) {
  try {
    const res = yield call(apiClient.post, '/api/news', action.payload); 
    yield put(createCompanyFeedItemRoutine.success(res.data.data));
  } catch (err) {
    toastr.error('Unable to create feed item');
  }
}

function* saveCompanyFeedItem(action) {
  try {
    // here well be api-call
    yield put(saveCompanyFeedItemRoutine.success());
  } catch (error) {
    toastr.error('Unable to save feed item');
  }
}

export default function* companyFeedSaga() {
  yield all([
    yield takeEvery(loadCompanyFeedRoutine.TRIGGER, loadCompanyFeed),
    yield takeEvery(loadCompanyFeedItemRoutine.TRIGGER, loadCompanyFeedItem),
    yield takeEvery(saveCompanyFeedItemRoutine.TRIGGER, saveCompanyFeedItem),
    yield takeEvery(createCompanyFeedItemRoutine.TRIGGER, createCompanyFeedItem)
  ]);
}
