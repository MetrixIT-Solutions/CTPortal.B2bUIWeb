/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { call, takeLatest } from 'redux-saga/effects';
import { postApiCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = { status: '777', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchInviteNotesSaga() {
  yield takeLatest('POST_B2B_CONSULTANT_INVITATIONS_NOTES_CREATE', workerPostB2BConsInviteNotesCreate);
  yield takeLatest('POST_B2B_CONSULTANT_INVITATIONS_NOTES_LIST', workerPostB2BConsInviteNotesList);
}
export default WatchInviteNotesSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostB2BConsInviteNotesCreate(action) { 
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BConsInviteNotesCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostB2BConsInviteNotesList(action) {  
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BConsInviteNotesListAPI + action.invId, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
