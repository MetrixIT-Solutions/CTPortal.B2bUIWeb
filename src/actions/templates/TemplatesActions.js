/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BTemplatesListAPI = (body, callback) => ({type: 'POST_B2B_TEMPLATES_LIST', body, callback});
export const getB2BTemplateViewAPI = (id, callback) => ({type: 'GET_B2B_TEMPLATE_VIEW', id, callback});
export const postB2BTemplateCreateAPI = (body, callback) => ({type: 'POST_B2B_TEMPLATE_CREATE', body, callback});
export const putB2BTemplateEditAPI = (id, body, callback) => ({type: 'PUT_B2B_TEMPLATE_UPDATE', id, body, callback});
export const getB2BTemplateAssignListAPI = (body, callback) => ({type: 'GET_B2B_TEMPLATE_ASSIGN_LIST', body, callback});
export const postB2BTemplateCheckListAPI = (body, callback) => ({type: 'POST_B2B_TEMPLATE_CHECK_LIST', body, callback});
export const postB2BTemplateCheckListApproveAPI = (id, callback) => ({type: 'POST_B2B_TEMPLATE_CHECK_LIST_APPROVE', id, callback});
export const postGetSignedPdfPaths = (body, callback) => ({type: 'POST_GET_SIGNED_PDF_PTHS', body, callback});