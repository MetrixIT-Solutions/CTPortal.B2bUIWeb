/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BFollowupsNotesCreateAPI = (body, callback) => ({ type: 'POST_B2B_SUBMISSION_FOLLOWUP_CREATE', body, callback });
export const getB2BSubmissionFollowUpsList = (subId, callback) => ({ type: 'GET_B2B_SUBMISSION_FOLLOW_LIST', subId, callback });
export const putB2BSubmissionFollowUpsNotesUpdate = (recordId, body, callback) => ({ type: 'PUT_B2B_SUBMISSION_FOLLOW_NOTES_UPDATE', recordId, body, callback });
