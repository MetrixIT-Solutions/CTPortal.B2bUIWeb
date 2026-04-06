/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */


import { call, takeLatest } from 'redux-saga/effects';
import { getApiCall, postApiCall, putApiCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = { status: '777', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchGoalsSaga() {
  yield takeLatest('POST_B2B_GOALS_LIST', workerPostB2BGoalsList);
  yield takeLatest('POST_B2B_GOALS_CREATE', workerPostB2BGoalsCreate);
  yield takeLatest('PUT_B2B_GOALS_UPDATE', workerPutB2BGoalsUpdate);
  yield takeLatest('PUT_B2B_GOALS_STATUS_UPDATE', workerPutB2BStatusUpdate);
  yield takeLatest('PUT_B2B_GOALS_REVIEW', workerPutB2BGoalsReview);
  yield takeLatest('PUT_B2B_GOALS_DELETE', workerPutB2BGoalsDelete);
}
export default WatchGoalsSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BGoalsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BGoalsListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BGoalsCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BGoalsCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BGoalsUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BGoalsUpdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BStatusUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BGoalsStatusUpdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BGoalsReview(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BGoalsReviewAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BGoalsDelete(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BGoalsDeleteAPI + action.recordId};
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
