import { all, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {
  loadCompanyFeedRoutine,
  loadCompanyFeedItemRoutine,
  saveCompanyFeedItemRoutine
} from './routines';
import { ICompanyFeedItem } from '../../models/companyFeed/ICompanyFeedItem';

const defaultItem = {
  title: '',
  text: '',
  images: '',
  creationDate: new Date().toLocaleString(),
  type: '',
  user: { id: '11', username: 'mark' }
} as ICompanyFeedItem;

const feedItemMock = {
  id: '1',
  title: 'Demo is coming...',
  text: 'Hello everybody. Today I would like to talk about our deadline. ' +
        'So, we know that the demo will be on 02.09.2020.',
  images: 'https://i.imgur.com/gWFCLjG.png',
  type: '',
  user: { id: '11', username: 'mark' }
};

function* loadCompanyFeed() {
  try {
    // here will be api-call
    console.log('load feed items');
    yield put(loadCompanyFeedRoutine.success({
      total: 2,
      size: 10,
      page: 0,
      items: [ feedItemMock ]
    }));
  } catch (error) {
    console.log(error);
    yield put(loadCompanyFeedRoutine.failure());
    toastr.error('Unable to load company feed');
  }
}

function* loadCompanyFeedItem(action) {
  try {
    const id = action.payload;
    if (!id) {
      console.log('return default');
      // return defaultItem
      yield put(loadCompanyFeedItemRoutine.success(defaultItem));
      return;
    }
    // here will be api-call
    yield put(loadCompanyFeedItemRoutine.success(feedItemMock));
  } catch (error) {
    yield put(loadCompanyFeedItemRoutine.failure());
    toastr.error('Can not load feed');
    console.log(error);
  }
}

function* saveCompanyFeedItem(action) {
  try {
    console.log(action.payload);
    // here well be api-call
    yield put(saveCompanyFeedItemRoutine.success());
  } catch (error) {
    toastr.error('Unable to save feed item');
    console.log(error);
  }
}

export default function* companyFeedSaga() {
  yield all([
    yield takeEvery(loadCompanyFeedRoutine.TRIGGER, loadCompanyFeed),
    yield takeEvery(loadCompanyFeedItemRoutine.TRIGGER, loadCompanyFeedItem),
    yield takeEvery(saveCompanyFeedItemRoutine.TRIGGER, saveCompanyFeedItem)
  ]);
}
