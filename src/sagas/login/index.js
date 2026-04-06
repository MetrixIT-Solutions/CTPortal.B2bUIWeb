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
function* WatchUserLoginSaga() {
  yield takeLatest('POST_B2B_USER_LOGIN', workerPostB2BUserLogin);
  yield takeLatest('POST_B2B_USER_SEND_OTP', workerPostB2BUserFrgtSendOtp);
  yield takeLatest('POST_B2B_USER_VERIFY_OTP', workerPostB2BUserFrgtVrfOtp);
  yield takeLatest('POST_B2B_USER_RESET_OTP', workerPostB2BUserFrgtRstPswd);
  yield takeLatest('POST_B2B_USER_LOGOUT', workerPostB2BUserLogout);
}
export default WatchUserLoginSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BUserLogin(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BUserLoginAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    yield put({ type: 'SET_B2B_USER_LOGIN_RES', data: resObj });

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BUserFrgtSendOtp(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.PostB2BUserFrgtSendOtp, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostB2BUserFrgtVrfOtp(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.PostB2BUserFrgtVrfOtp, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostB2BUserFrgtRstPswd(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.PostB2BUserFrgtRstPswd, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostB2BUserLogout(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BUserLogoutAPI };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}