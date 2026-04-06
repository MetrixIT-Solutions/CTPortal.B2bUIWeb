/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const PostB2BBranchesList = (body, callback) => ({ type: 'POST_B2B_BRANCHES_LIST', body, callback });
export const GetB2BBranchesView = (recordId, callback) => ({ type: 'GET_B2B_BRANCHES_VIEW', recordId, callback });
export const PostB2BBrchsTotalList = (body, callback) => ({ type: 'POST_B2B_BRCHS_TOTAL_LIST', body, callback });
export const postB2BBranchesCreate = (body, callback) => ({ type: 'POST_B2B_BRANCHES_CREATE', body, callback });
export const putB2BBranchesUpdate = (recordId, body, callback) => ({ type: 'PUT_B2B_BRANCHES_UPDATE', recordId, body, callback });
export const putB2BBranchesStatusUpdate = (recordId, body, callback) => ({ type: 'PUT_B2B_BRANCHES_STATUS_UPDATE', recordId, body, callback });
export const deleteB2BBranchesDelete = (recordId, body, callback) => ({ type: 'DELETE_B2B_BRANCHES_DELETE', recordId, body, callback });