/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import {call, put, takeLatest} from "redux-saga/effects";
import {postApiCall, getApiCall, putApiCall, deleteCall} from "../../server/ApiCallManager";
import apis from "../../../config/apis.json";

const errEmptyRes = {};
const timeOutRes = {status: "777", message: "Server not responding"};

//--- Begin: Saga main Action Watcher generator function
function* WatchUserMeetingLinkSaga() {
  yield takeLatest("GET_B2B_MEETING_LINK_LIST", workerGetB2BMeetingLinkList);
  yield takeLatest("POST_B2B_MEETING_LINK_CREATE", workerPostB2BMeetingLinkCreate);
  yield takeLatest("PUT_B2B_MEETING_LINK_DELETE", workerPutB2BMeetingLinkDelete);
  yield takeLatest("GET_B2B_MEETING_LINK_VIEW", workerGetB2BMeetingLinkView);
  yield takeLatest("PUT_B2B_MEETING_LINK_UPDATE", workerPutB2BMeetingLinkUpdate);
}

export default WatchUserMeetingLinkSaga;
//--- End: Saga main Action Watcher generator function

function* workerGetB2BMeetingLinkList(action) {
  const timeOutApiCall = setTimeout(() => {
    action.callback(timeOutRes);
  }, 50000);
  try {
    // API calls here
    let reqObj = {apiUrl: apis.getB2BMeetingLinkListAPI};
    const resObj = yield call(getApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostB2BMeetingLinkCreate(action) {
  const timeOutApiCall = setTimeout(() => {
    action.callback(timeOutRes);
  }, 50000);
  try {
    // API calls here
    let reqObj = {apiUrl: apis.postB2BMeetingLinkCreateAPI, body: action.reqBody};
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BMeetingLinkDelete(action) {
  const timeOutApiCall = setTimeout(() => {
    action.callback(timeOutRes);
  }, 50000);
  try {
    // API calls here
    let reqObj = {apiUrl: apis.putB2BMeetingLinkDeleteAPI + action.recordid};
    const resObj = yield call(deleteCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerGetB2BMeetingLinkView(action) {
  const timeOutApiCall = setTimeout(() => {
    action.callback(timeOutRes);
  }, 50000);
  try {
    // API calls here
    let reqObj = {apiUrl: apis.getB2BMeetingLinkViewAPI + action.recordid};
    const resObj = yield call(getApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutB2BMeetingLinkUpdate(action) {
  const timeOutApiCall = setTimeout(() => {
    action.callback(timeOutRes);
  }, 50000);
  try {
    // API calls here
    let reqObj = {apiUrl: apis.putB2BMeetingLinkUpdateAPI + action.recordid, body: action.reqBody};
    const resObj = yield call(putApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}