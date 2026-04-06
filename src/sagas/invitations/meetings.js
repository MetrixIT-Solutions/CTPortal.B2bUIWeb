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
function* WatchInviteMeetingsSaga() {
  yield takeLatest('POST_B2B_CONSULTANT_INVITATIONS_MEETINGS_LIST', workerPostB2BConsInviteMeetingsList);
  yield takeLatest('POST_B2B_CONSULTANT_INVITATIONS_MEETINGS_CREATE', workerPostB2BConsInviteMeetingsCreate);
  yield takeLatest('PUT_B2B_CONSULTANT_INVITATIONS_MEETINGS_RESCHEDULE', workerPutB2BConsInviteMeetingReSchedule);
  yield takeLatest('PUT_B2B_CONSULTANT_INVITATIONS_MEETINGS_STSUPDT', workerPutB2BConsInviteMeetingStsUpdt);
}
export default WatchInviteMeetingsSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BConsInviteMeetingsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BConsInviteMeetingsListAPI + action.invId, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BConsInviteMeetingsCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BConsInviteMeetingsCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BConsInviteMeetingReSchedule(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BConsInviteMeetingReScheduleAPI+action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BConsInviteMeetingStsUpdt(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.putB2BConsInviteMeetingStsUpdtAPI+action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
