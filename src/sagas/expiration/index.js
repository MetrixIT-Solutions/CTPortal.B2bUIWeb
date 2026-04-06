/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { call, takeLatest } from 'redux-saga/effects';
import { postApiCall, putApiCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = { status: '777', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchExpirationsSaga() {
  yield takeLatest('GET_B2B_EXPIRA_LIST', workergetB2BExpirationList);
  yield takeLatest('PUT_B2B_EXPIRA_VRFCTN_UPDATE', workerputB2BExpirationVrfctnUpdate);
  yield takeLatest('PUT_B2B_EXPIRA_UPDATE', workerputB2BExpirationUpdate);
  yield takeLatest('POST_B2B_CNSLTANT_EXPRTN_LIST', workerPostB2BCunsntExpirationList);
  yield takeLatest('GET_B2B_CNSLTANT_EXPRTN_IDS_LIST', workerGetB2BCnsltntExpirationIdsList);
}
export default WatchExpirationsSaga;
//--- End: Saga main Action Watcher generator function

function* workergetB2BExpirationList(action) {  
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BExpirationListAPI, body: action.body };        
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
};

function* workerputB2BExpirationVrfctnUpdate(action) {  
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BExpirationVrfctnUpdateAPI + action.recordId, body: action.body };  
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
};

function* workerputB2BExpirationUpdate(action) {  
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BExpirationUpdateAPI + action.recordId, body: action.body };  
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
};

function* workerPostB2BCunsntExpirationList(action) {  
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.PostB2BCnsltntExpirationListAPI, body: action.body };  
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
};

function* workerGetB2BCnsltntExpirationIdsList(action) {  
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.GetB2BCnsltntExpirationIdsListAPI, body: action.body };  
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
};