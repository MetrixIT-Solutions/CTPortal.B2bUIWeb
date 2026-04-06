/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { getApiCall, postApiCall, putApiCall, deleteCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = { status: '777', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchOfferLetterSaga() {
  yield takeLatest('POST_B2B_OFR_LTR_LIST', workerPostB2BOfrLtrList);
  yield takeLatest('POST_B2B_OFR_LTR_CREATE', workerPostB2BOfrLtrCreate);
  yield takeLatest('PUT_B2B_OFR_LTR_CASE_ID_UPDT', workerPutB2BOfrLtrCaseIdUpdt);
  yield takeLatest('GET_B2B_OFR_LTR_STLFC_LST', workerGetB2BOfrLtrStLfcLst);
  yield takeLatest('PUT_B2B_OFR_LTR_PRTY_UPDT', workerPutB2BOfrLtrPrtyUpdate);

  yield takeLatest('POST_B2B_OFR_LTR_FWLP_CREATE', workerPostB2BOfrLtrFwlpCreate);
  yield takeLatest('GET_B2B_OFR_LTR_FLLWUP_NTS_LIST', workerGetB2BOfrLtrFllwUpNtsList);
  yield takeLatest('PUT_B2B_OFR_LTR_FLLWUP_NTS_UPDATE', workerPutB2BOfrLtrFllwUpNtsUpdate);
  yield takeLatest('PUT_B2B_OFR_LTR_DELETE', workerPutB2BOfrLtrDelete);
}
export default WatchOfferLetterSaga;
//--- End: Saga main Action Watcher generator function

// -- start offer Letter Create, List
function* workerPostB2BOfrLtrList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BOfrLtrListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostB2BOfrLtrCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BOfrLtrCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
// -- end offer Letter Create, List

// start Case Id update
function* workerPutB2BOfrLtrCaseIdUpdt(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BOfrLtrCaseIdUpdtAPI  + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
// end Case Id update

// start Life Cycle List
function* workerGetB2BOfrLtrStLfcLst(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BOfrLtrStLfcLstAPI  + action.recordId };
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
// end Life Cycle List

// start priority update
function* workerPutB2BOfrLtrPrtyUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BOfrLtrPrtyUpdtAPI  + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
// end priority update


// start follow up
function* workerPostB2BOfrLtrFwlpCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BOfrLtrFwlpCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function*  workerGetB2BOfrLtrFllwUpNtsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BOfrLtrFllwUpNtsListAPI + action.recordId };
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function*  workerPutB2BOfrLtrFllwUpNtsUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BOfrLtrFllwUpNtsUpdate + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function*  workerPutB2BOfrLtrDelete(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BOfrLtrDeleteAPI + action.recordId, body: action.body};
    const resObj = yield call(deleteCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
// end follow up
