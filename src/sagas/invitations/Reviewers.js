
/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { getApiCall, postApiCall, deleteCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = { status: '777', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchInvitationsReviewerSaga() {

  yield takeLatest('GET_B2B_CONSULTANT_INVITE_REVIEWERS_LIST', workerGetB2BConsInviteReviewersList);
  yield takeLatest('POST_B2B_CONSULTANT_INVITE_REVIEWERS_CREATE', workerPostB2BConsInviteReviewersCreate);
  yield takeLatest('POST_B2B_CONSULTANT_INVITE_REVIEWERS_NOTES_CREATE', workerPostB2BConsInviteReviewerNotesCreate);
}
export default WatchInvitationsReviewerSaga;
//--- End: Saga main Action Watcher generator function

function* workerGetB2BConsInviteReviewersList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.getB2BConsInviteReviewersListAPI + action.invId, body: action.body };
    const resObj = yield call(getApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BConsInviteReviewersCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BConsInviteReviewersCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BConsInviteReviewerNotesCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    let reqObj = { apiUrl: apis.postB2BConsInviteReviewersNotesCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}