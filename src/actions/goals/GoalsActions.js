/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BGoalsList = (body, callback) => ({type: 'POST_B2B_GOALS_LIST', body, callback});
export const postB2BGoalsCreate = (body, callback) => ({type: 'POST_B2B_GOALS_CREATE', body, callback});
export const putB2BGoalsUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_GOALS_UPDATE', recordId, body, callback});
export const putB2BGoalsStatusUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_GOALS_STATUS_UPDATE', recordId, body, callback});
export const putB2BGoalsReview = (recordId, body, callback) => ({type: 'PUT_B2B_GOALS_REVIEW', recordId, body, callback});
export const putB2BGoalsDelete = (recordId, callback) => ({type: 'PUT_B2B_GOALS_DELETE', recordId, callback});
