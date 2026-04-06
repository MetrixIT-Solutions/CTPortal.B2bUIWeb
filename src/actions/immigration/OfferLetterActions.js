/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */


export const postB2BOfrLtrList = (body, callback) => ({type: 'POST_B2B_OFR_LTR_LIST', body, callback});
export const postB2BOfrLtrCreate = (body, callback) => ({type: 'POST_B2B_OFR_LTR_CREATE', body, callback});
export const putB2BOfrLtrCaseIdUpdt = (recordId, body, callback) => ({type: 'PUT_B2B_OFR_LTR_CASE_ID_UPDT', recordId, body, callback});
export const getB2BOfrLtrStLfcLst = (recordId, callback) => ({type: 'GET_B2B_OFR_LTR_STLFC_LST', recordId, callback}); 
export const putB2BOfrLtrPrtyUpdt = (recordId, body, callback) => ({type: 'PUT_B2B_OFR_LTR_PRTY_UPDT', recordId, body, callback});

export const postB2BOfrLtrFwlpCreate = (body, callback) => ({type: 'POST_B2B_OFR_LTR_FWLP_CREATE', body, callback});
export const getB2BOfrLtrfllwUpNtsList = (recordId, callback) => ({type: 'GET_B2B_OFR_LTR_FLLWUP_NTS_LIST', recordId, callback});
export const putB2BOfrLtrfllwUpNtsUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_OFR_LTR_FLLWUP_NTS_UPDATE', recordId, body, callback});
export const putB2BOfrLtrDelete = (recordId, body, callback) => ({type: 'PUT_B2B_OFR_LTR_DELETE', recordId, body, callback});
