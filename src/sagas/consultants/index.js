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
function* WatchConsultantsSaga() {
  yield takeLatest('POST_B2B_CNSLTANTS_LIST', workerPostB2BCnsltantsList);
  yield takeLatest('DELETE_B2B_CNSLTANTS', workerDeleteB2BConsultantsDelete);
  yield takeLatest ('PUT_B2B_CNSLTANTS_STATUS_UPDATE', putB2BConsultantsStatusUpdate);
  yield takeLatest('PUT_B2B_CNSLTANTS_CHNG_PASSWORD', WorkerPutB2BCnsultantChngPassword);
  yield takeLatest('GET_B2B_CNSLTANT_VIEW', workerGetB2BCnsltantView);
  yield takeLatest('POST_B2B_CNSLTANT_WORK_INFO', workerPostB2BCnsltantWorkInfo);
  yield takeLatest('POST_B2B_CNSLTANT_EDU_INFO', workerPostB2BCnsltantEduInfo);
  yield takeLatest('POST_B2B_CNSLTANT_EXP_INFO', workerPostB2BCnsltantExpInfo);
  yield takeLatest('DELETE_B2B_CNSLTANT_EDU_INFO', workerDeleteB2BCnsltantEduInfo);
  yield takeLatest('DELETE_B2B_CNSLTANT_EXP_INFO', workerDeleteB2BCnsltantExpInfo);
  yield takeLatest('POST_B2B_CNSLTANTS_RESET_PASSWORD_LINK', workerPostB2BInvitePwdLink);
  yield takeLatest('POST_B2B_CNSLTANT_CRTFC_INFO', workerPostB2BCnsltantCrtfcInfo);
  yield takeLatest('DELETE_B2B_CNSLTANT_CRTFC_INFO', workerDeleteB2BCnsltantCrtfcInfo);
}
export default WatchConsultantsSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BCnsltantsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BCnsltantsListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    yield put({ type: 'SET_B2B_CNSLTANTS_LIST', data: resObj });
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerDeleteB2BConsultantsDelete(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.deleteB2BConsultantsDeleteAPI + action.recordId, body: action.body };
    const resObj = yield call(deleteCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* putB2BConsultantsStatusUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BConsultantsStatusUpdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* WorkerPutB2BCnsultantChngPassword(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BConsultantsChangePasswordAPI, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerGetB2BCnsltantView(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BConsultantViewAPI + action.recordId };
    const resObj = yield call(getApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostB2BCnsltantWorkInfo(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BUpdateCnsltantWorkInfoAPI + action.id, body: action.body  };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostB2BCnsltantEduInfo(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BUpdateCnsltantEduInfoAPI + action.id, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostB2BCnsltantExpInfo(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BUpdateCnsltantExpInfoAPI + action.id, body: action.body};    
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerDeleteB2BCnsltantEduInfo(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.deleteB2BDeleteCnsltantEduInfoAPI + action.id };    
    const resObj = yield call(deleteCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerDeleteB2BCnsltantExpInfo(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.deleteB2BDeleteCnsltantExpInfoAPI + action.id };    
    const resObj = yield call(deleteCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostB2BInvitePwdLink(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BInvitePwdLinkAPI + action.recordId, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BCnsltantCrtfcInfo(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BCnsltantCrtfcInfoAPI + action.id, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerDeleteB2BCnsltantCrtfcInfo(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.deleteB2BCnsltantCrtfcInfoAPI + action.id };  
    const resObj = yield call(deleteCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}