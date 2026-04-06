/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */
  
export const postB2BIntrvwFdBkCreate = (body, callback) => ({type: 'POST_B2B_INTERVIEWS_FEEDBACK_CREATE', body, callback});
export const postB2BIntrvwFdBkList = (itrvId, body, callback) => ({type: 'POST_B2B_INTERVIEWS_FEEDBACK_LIST', itrvId, body, callback});
export const getB2BIntrvwFdBkView = (recordId, callback) => ({type: 'GET_B2B_INTERVIEWS_FEEDBACK_VIEW', recordId, callback});
export const putB2BIntrvwFdBkUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_INTERVIEWS_FEEDBACK_UPDATE', recordId, body, callback});