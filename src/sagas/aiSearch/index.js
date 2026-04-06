/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { postApiCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = { status: '777', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchOpenAiSearchSaga() {
  yield takeLatest('POST_B2B_OPEN_AI_SEARCH', workerPostB2BOpenAiSearch);
}
export default WatchOpenAiSearchSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BOpenAiSearch(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BOpenAiSearch, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    yield put({ type: 'SET_B2B_OPEN_AI_SEARCH', data: resObj });
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}