/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {postApiCall, getApiCall, putApiCall, deleteCall} from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = {status: '777', message: 'Server not responding'};

//--- Begin: Saga main Action Watcher generator function
function* WatchVendorSaga() {
  yield takeLatest('POST_B2B_VENDORS_LIST', workerPostB2BVendorsList);
  yield takeLatest('POST_B2B_VENDORS_CREATE', workerPostB2BVendorsCreate);
  yield takeLatest('GET_B2B_VENDORS_VIEW', workerGetB2BVendorsView);
  yield takeLatest('PUT_B2B_VENDORS_UPDATE', workerPutB2BVendorsUpdateAPI);
  yield takeLatest('PUT_B2B_VENDORS_STATUS_UPDATE', workerPutB2BVendorsStatusUpdateAPI);
  yield takeLatest('PUT_B2B_VENDORS_DELETE', workerPutB2BVendorsDeleteAPI);
}
export default WatchVendorSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BVendorsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BVendorsListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BVendorsCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BVendorsCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerGetB2BVendorsView(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BVendorsViewAPI + action.recordId };
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BVendorsUpdateAPI(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BVendorsUpdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BVendorsStatusUpdateAPI(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BVendorsStatusUpdateAPI + action.recordId + '/' + action.status };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPutB2BVendorsDeleteAPI(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BVendorsDeleteAPI + action.recordId, body: action.body };
    const resObj = yield call(deleteCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
