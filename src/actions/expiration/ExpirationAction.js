/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const getB2BExpirationList = (body, callback) => ({type: 'GET_B2B_EXPIRA_LIST', body, callback});
export const putB2BExpirationVrfctnUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_EXPIRA_VRFCTN_UPDATE', recordId, body, callback})
export const putB2BExpirationUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_EXPIRA_UPDATE', recordId, body, callback})
export const PostB2BCuntntExpirationList = (body, callback) => ({type: 'POST_B2B_CNSLTANT_EXPRTN_LIST', body, callback});
export const getB2BCnsltntExpirationIdsList = (body, callback) => ({type: 'GET_B2B_CNSLTANT_EXPRTN_IDS_LIST', body, callback});
