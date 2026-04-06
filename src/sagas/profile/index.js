/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {postApiCall, getApiCall, putApiCall} from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = {status: '777', message: 'Server not responding'};

//--- Begin: Saga main Action Watcher generator function
function* WatchUserProfileSaga() {
  yield takeLatest('GET_B2B_USER_PROFILE_VIEW', workerGetB2BUserProfileView);
  yield takeLatest('POST_B2B_USER_CHANGE_PASSWORD', workerPostB2BUserChangePassword);
  yield takeLatest('POST_B2B_USER_PROFILE_UPDATE', workerPostB2BUserProfileUpdate);
  yield takeLatest('POST_B2B_USER_PROFILE_ADRS_UPDATE', workerPostB2BUserProfileAdrsUpdate);
}

export default WatchUserProfileSaga;
//--- End: Saga main Action Watcher generator function

function* workerGetB2BUserProfileView(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BUserProfileViewAPI, body: {} };
    const resObj = yield call(getApiCall, reqObj);
    yield put({ type: 'SET_B2B_USER_LOGIN_RES', data: resObj });

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BUserChangePassword(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BUserChangePasswordAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BUserProfileUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BUserProfileUpdateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    yield put({ type: 'SET_B2B_USER_LOGIN_RES', data: resObj });

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BUserProfileAdrsUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BUserProfileAdrsUpdateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    yield put({ type: 'SET_B2B_USER_LOGIN_RES', data: resObj });

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
