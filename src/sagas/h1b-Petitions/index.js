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
function* WatchH1BPtnsSaga() {
  yield takeLatest('POST_B2B_H1BPTNS_LIST', workerPostB2BH1BPtnsList);
  yield takeLatest('POST_B2B_H1BPTNS_CREATE', workerPostB2BH1BPtnsCreate);
  yield takeLatest('PUT_B2B_H1BPTNS_STATUS_UPDATE', workerPutB2BH1BPtnsStatusUpdate);
  yield takeLatest('PUT_B2B_H1BPTNS_CASEID_UPDATE', workerPutB2BH1BPtnsCaseIdUpdate);
  yield takeLatest('GET_B2B_H1BPTNS_LYFCYL_HSTRY', workerGetB2BH1BPtnsLyfCylHstry);
  yield takeLatest('PUT_B2B_H1BPTNS_PRTY_UPDT', workerPutB2BH1BPtnsPrtyUpdt);

  yield takeLatest('POST_B2B_H1BPTNS_FLLWUP_NTS_CREATE', workerPostB2BH1BPtnsFllwUpNtsCreate);
  yield takeLatest('GET_B2B_H1BPTNS_FLLWUP_NTS_LIST', workerGetB2BH1BPtnsFllwUpNtsList);
  yield takeLatest('PUT_B2B_H1BPTNS_FLLWUP_NTS_UPDATE', workerPutB2BH1BPtnsFllwUpNtsUpdt);
  yield takeLatest('PUT_B2B_H1BPTNS_DELETE', workerPutH1bPetitionDelete);
}
export default WatchH1BPtnsSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BH1BPtnsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BH1BPtnsListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BH1BPtnsCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BH1BPtnsCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BH1BPtnsStatusUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BH1BPtnsStatusupdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BH1BPtnsCaseIdUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BH1BPtnsCaseIdupdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerGetB2BH1BPtnsLyfCylHstry(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BH1BPtnsLyfCylHstryAPI + action.recordId };
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BH1BPtnsPrtyUpdt(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BH1BPtnsPrtyUpdtAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

// ---- Start | H1B Petitions Followup Notes
function* workerPostB2BH1BPtnsFllwUpNtsCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BH1BPtnsfllwUpNtsCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerGetB2BH1BPtnsFllwUpNtsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BH1BPtnsfllwUpNtsListAPI + action.recordId };
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BH1BPtnsFllwUpNtsUpdt(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BH1BPtnsfllwUpNtsUpdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutH1bPetitionDelete(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putH1bPetitionDeleteAPI + action.recordId, body: action.body };
    const resObj = yield call(deleteCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
// ---- End | H1B Petitions Followup Notes
