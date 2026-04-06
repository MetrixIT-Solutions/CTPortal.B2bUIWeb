/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const PostB2BOrgsList = (body, callback) => ({type: 'POST_B2B_ORGS_LIST', body, callback});
export const GetB2BOrgView = (id, callback) => ({type: 'GET_B2B_ORG_VIEW', id, callback});
export const PutB2BOrgStatusUpdate = (body, callback) => ({type: 'PUT_B2B_ORG_STATUS_UPDATE', body, callback});
export const PostB2BOrgsTotalList = (body, callback) => ({type: 'POST_B2B_ORGS_TOTAL_LIST', body, callback});
export const PutB2BOrgsSmtpDetails = (id, body, callback) => ({type: 'PUT_B2B_ORGS_SMTP_DETAILS', id, body, callback});
