/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const PostB2BSubsList = (body, callback) => ({type: 'POST_B2B_SUBMISSIONS_LIST', body, callback});
export const GetB2BSubView = (id, callback) => ({type: 'GET_B2B_SUBMISSION_VIEW', id, callback});
export const GetB2BSubLfcHistoryList = (id, callback) => ({type: 'GET_B2B_SUBMISSION_LFC_HISTORY', id, callback});
export const postB2BSubMeetingsList = (invId, body, callback) => ({type: 'POST_B2B_SUBMISSION_MEETINGS_LIST', invId, body, callback});
export const postB2BSubMeetingsCreate = (body, callback) => ({type: 'POST_B2B_SUBMISSION_MEETINGS_CREATE', body, callback});
export const putB2BSubMeetingReSchedule = (recordId, body, callback) => ({type: 'PUT_B2B_SUBMISSION_MEETINGS_RESCHEDULE', recordId, body, callback});
export const putB2BSubMeetingStsUpdt = (recordId, body, callback) => ({type: 'PUT_B2B_SUBMISSION_MEETINGS_STSUPDT', recordId, body, callback});
export const PostB2BSubmissionPayRateHistory = (body, callback) => ({type: 'PUT_B2B_SUBMISSION_PAY_RATE_HISTORY', body, callback});
export const postB2BSubmissionPriorityCreate = (id, body, callback) => ({type: 'POST_B@B_SUBMISSION_PRIORITY_CREATE', id, body, callback});