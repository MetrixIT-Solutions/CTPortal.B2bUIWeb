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
function* WatchInterviewsFeedbackSaga() {'PUT_B2B_INTERVIEWS_FEEDBACK_UPDATE'
  yield takeLatest('POST_B2B_INTERVIEWS_FEEDBACK_CREATE', workerPostB2BIntrvwFeedbackCreate);
  yield takeLatest('POST_B2B_INTERVIEWS_FEEDBACK_LIST', workerPostB2BIntrvwFeedbackList);
  yield takeLatest('GET_B2B_INTERVIEWS_FEEDBACK_VIEW', workerGetB2BIntrvwFeedbackView);
  yield takeLatest('PUT_B2B_INTERVIEWS_FEEDBACK_UPDATE', workerGetB2BIntrvwFeedbackUpdate);
}
export default WatchInterviewsFeedbackSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BIntrvwFeedbackCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BIntrvwFdBkCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BIntrvwFeedbackList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BIntrvwFdBkListAPI +  action.itrvId, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerGetB2BIntrvwFeedbackView(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BIntrvwFdBkViewAPI +  action.recordId };
    const resObj = yield call(getApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerGetB2BIntrvwFeedbackUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BIntrvwFdBkUpdateAPI +  action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

