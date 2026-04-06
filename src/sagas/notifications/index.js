/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import {call, put, takeLatest} from 'redux-saga/effects';
import {  getApiCall, putApiCall} from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = {status: '777', message: 'Server not responding'};

//--- Begin: Saga main Action Watcher generator function
function* WatchNotificationsSaga() {
  yield takeLatest('GET_B2B_NOTIFICATIONS_LIST', workerGetB2BNotificationsList);
  yield takeLatest('PUT_B2B_NOTIFICATION_UPDATE', workerPutB2BNotificationsRead);
}
export default WatchNotificationsSaga;
//--- End: Saga main Action Watcher generator function

function* workerGetB2BNotificationsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BNotificationsListApi };
    const resObj = yield call(getApiCall, reqObj);                        
    yield put({type: 'SET_B2B_NOTIFICATIONS_LIST', data: resObj});
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BNotificationsRead(action) {    
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BNotificationsReadApi, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
