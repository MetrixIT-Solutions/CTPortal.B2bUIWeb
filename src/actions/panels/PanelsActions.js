/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BOrgTeamsList = (body, callback) => ({type: 'POST_B2B_ORG_TEAMS_LIST', body, callback});
export const postB2BOrgTeamsCreate = (body, callback) => ({type: 'POST_B2B_ORG_TEAMS_CREATE', body, callback});
export const postB2BOrgTeamsTotalList = (body, callback) => ({type: 'POST_B2B_ORG_TEAMS_TOTAL_LIST', body, callback});
export const getB2BOrgTeamsView = (recordId, callback) => ({type: 'GET_B2B_ORG_TEAMS_VIEW_DATA', recordId, callback});
export const postB2BOrgTeamsUpdate = (body, callback) => ({type: 'POST_B2B_ORG_TEAMS_UPDATE', body, callback});
export const deleteB2BOrgTeamsDelete = (recordId, body, callback) =>({type: 'DELETE_B2B_ORG_TEAMS_DELETE', recordId, body, callback});
export const putB2BOrgTeamsStatusUpdate = (recordId, body, callback) =>({type: 'PUT_B2B_ORG-TEAMS_STATUS_UPDATE', recordId, body, callback});
