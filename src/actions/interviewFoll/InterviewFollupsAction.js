/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const getB2BInterviewFollowUpsList = (intrvwId, callback) => ({ type: 'GET_B2B_INTERVIEW_FOLLOWUP_LIST', intrvwId, callback });
export const postB2BInterviewFollowupsCreate = ( body, callback) => ({ type: 'POST_B2B_INTERVIEW_FOLLOWUP_CREATE', body, callback });
export const putB2BInterviewFollowUpsNotesUpdate = (recordId, body, callback) => ({ type: 'PUT_B2B_INTERVIEW_FOLLOWUP_NOTS_UPDATE', recordId, body, callback });
