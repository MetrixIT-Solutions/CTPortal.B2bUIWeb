/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { postApiCall, getApiCall, putApiCall, deleteCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = { status: '777', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchInterviewFollSaga() {
  yield takeLatest('GET_B2B_INTERVIEW_FOLLOWUP_LIST', workergetB2BInterviewFollowUps);
  yield takeLatest('POST_B2B_INTERVIEW_FOLLOWUP_CREATE', workerpostB2BInterviewFollowupsCreate);
  yield takeLatest('PUT_B2B_INTERVIEW_FOLLOWUP_NOTS_UPDATE', workerpostB2BInterviewFollowupsUpdate);
}

export default WatchInterviewFollSaga;
//--- End: Saga main Action Watcher generator function

function* workergetB2BInterviewFollowUps(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BInterviewFollowUpsListAPI + action.intrvwId };
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerpostB2BInterviewFollowupsCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BInterviewFollowupsCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerpostB2BInterviewFollowupsUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BInterviewFollowUpsNotesUpdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}