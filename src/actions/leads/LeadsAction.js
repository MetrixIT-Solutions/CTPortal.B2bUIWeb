/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BLeadsList = (body, callback) => ({ type: 'POST_B2B_LEADS_LIST', body, callback });
export const putB2BLeadStatusUpdate = (id, body, callback) => ({ type: 'PUT_B2B_LEAD_STATUS_UPDATE', id, body, callback });
export const postB2BSubmissionLeadList = (body, callback) => ({ type: 'POST_B2B_SUBMISSION_LEAD_LIST', body, callback });
export const getB2BLeadView = (id, callback) => ({ type: 'GET_B2B_LEAD_VIEW', id, callback });
export const putB2BLeadsTemplateUpdate = (id, body, callback) => ({ type: 'PUT_B2B_LEADS_TEMPLATE_UPDATE', id, body, callback });
export const getB2BLeadLfcHistoryList = (id, callback) => ({ type: 'GET_B2B_LEAD_LFC_HISTORY_LIST', id, callback });
export const postB2BLeadPriorityCreate = (id, body, callback) => ({ type: 'POST_B2B_LEAD_PRIORITY_CREATE', id, body, callback });

export const postB2BOnBoardingNotesCreateAPI = (body, callback) => ({ type: 'POST_B2B_ONBOARDING_NOTE_CREATE', body, callback });
export const getB2BOnBoardingNotesList = (body, callback) => ({ type: 'GET_B2B_ONBOARDING_NOTES_LIST', body, callback });
export const putB2BOnBoardingNotesUpdate = (id, body, callback) => ({ type: 'PUT_B2B_ONBOARDING_NOTES_UPDATE', id, body, callback });
export const putB2BLeadReassignUa = (id, body, callback) => ({ type: 'PUT_B2B_LEAD_REASSIGN_USER_ARR', id, body, callback });
export const getB2BGoalsLfcHistoryList = (recordId, callback) => ({ type: 'POST_B2B_GOALS_LFC_HISTORY_LIST', recordId, callback });