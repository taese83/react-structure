import { all, put, takeEvery } from 'redux-saga/effects';
import { getData, setData } from './slice';

function* getDataFromServer() {
  console.log('get data from server');
  yield put(setData('from Server'));
}

export default function* watch() {
  yield all([takeEvery(getData, getDataFromServer)]);
}
