/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BCnsltantsList = (body, callback) => ({ type: 'POST_B2B_CNSLTANTS_LIST', body, callback });
export const deleteB2BConsultantsDelete = (recordId, body, callback) => ({ type: 'DELETE_B2B_CNSLTANTS', recordId, body, callback });
export const putB2BConsultantsStatusUpdate = (recordId, body, callback) => ({ type: 'PUT_B2B_CNSLTANTS_STATUS_UPDATE', recordId, body, callback });
export const putB2BConsultantsChangePassword = (body, callback) => ({ type: 'PUT_B2B_CNSLTANTS_CHNG_PASSWORD', body, callback });
export const getB2BConsultantView = (recordId, callback) => ({ type: 'GET_B2B_CNSLTANT_VIEW', recordId, callback });
export const PostB2BCnsltantWorkInfo = (body, id, callback) => ({type: 'POST_B2B_CNSLTANT_WORK_INFO', body,  id, callback});
export const PostB2BCnsltantEduInfo = (body, id, callback) => ({type: 'POST_B2B_CNSLTANT_EDU_INFO', body, id, callback});
export const PostB2BCnsltantExpInfo = (body, id, callback) => ({type: 'POST_B2B_CNSLTANT_EXP_INFO', body, id, callback});
export const DeleteB2BCnsltantEduInfo = (id, callback) => ({type: 'DELETE_B2B_CNSLTANT_EDU_INFO', id, callback});
export const DeleteB2BCnsltantExpInfo = (id, callback) => ({type: 'DELETE_B2B_CNSLTANT_EXP_INFO', id, callback});
export const PostB2BCnsltantsPwdLink = (recordId, body, callback) => ({type: 'POST_B2B_CNSLTANTS_RESET_PASSWORD_LINK', recordId, body, callback});
export const PostB2BCnsltantCrtfcInfo = (body, id, callback) => ({type: 'POST_B2B_CNSLTANT_CRTFC_INFO', body, id, callback});
export const DeleteB2BCnsltantCrtfcInfo = (id, callback) => ({type: 'DELETE_B2B_CNSLTANT_CRTFC_INFO', id, callback});
