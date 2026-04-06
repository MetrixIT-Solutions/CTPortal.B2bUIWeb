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
function* WatchUserRolesSaga() {
  yield takeLatest('POST_B2B_ROLES_LIST', workerPostB2BRolesList);
  yield takeLatest('POST_B2B_ROLES_CREATE', workerPostB2BRolesCreate);
  yield takeLatest('GET_B2B_ROLES_VIEW', workerGetB2BRoleView);
  yield takeLatest('PUT_B2B_ROLE_UPDATE', workerPutB2BRoleUpdate);
  yield takeLatest('PUT_B2B_ROLE_STATUS_UPDATE', workerPutB2BRoleStatusUpdate);
  yield takeLatest('DELETE_B2B_ROLE_DELETE', workerDeleteB2BRolesDelete);
  yield takeLatest('POST_B2B_ROLES_ACTIVE_LIST', workerPostB2BRolesActiveList);
}

export default WatchUserRolesSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BRolesList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BRolesListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    yield put({ type: 'SET_B2B_ROLES_LIST_RES', data: resObj });
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function*  workerPostB2BRolesCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BRolesCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerGetB2BRoleView(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BRoleViewAPI + action.id };
    const resObj = yield call(getApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BRoleUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BRoleUpdateAPI + action.id, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BRoleStatusUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BRoleStatusUpdateAPI + action.id, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerDeleteB2BRolesDelete(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.deleteB2BRolesDeleteAPI + action.id, body: action.body };
    const resObj = yield call(deleteCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BRolesActiveList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BRolesActiveListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    yield put({ type: 'SET_B2B_ROLES_LIST_RES', data: resObj });
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
