/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const PostB2BInterviewsList = (body, callback) => ({type: 'POST_B2B_INTERVIEWS_LIST', body, callback});
export const GetB2BInvView = (id, callback) => ({type: 'GET_B2B_INTERVIEW_VIEW', id, callback});
export const GetB2BInvLfcList = (id, callback) => ({type: 'GET_B2B_INTERVIEW_LFC_LIST', id, callback});
export const postB2BInterviewPriorityCreate = (id, body, callback) => ({type: 'POST_B2B_INTERVIEW_PRIORITY_CREATE', id, body, callback});
export const putB2BInterviewVerStsUpdate = (id, body, callback) => ({type: 'PUT_B2B_INTERVIEW_VER_STS_UPDATE', id, body, callback});