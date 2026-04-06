/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BUsersList = (body, callback) => ({type: 'POST_B2B_USERS_LIST', body, callback});
export const GetB2BUserView = (id, callback) => ({type: 'GET_B2B_USER_VIEW', id, callback});
export const PostB2BUserInviteCreate = (body, callback) => ({type: 'POST_B2B_USERS_INVITE_CREATE', body, callback});
export const PutB2BUserStatusUpdate = (recordid, body, callback) => ({type: 'PUT_B2B_USERS_STATUS_UPDATE', recordid, body, callback});
export const DeleteB2BUserDelete = (recordid, body, callback) => ({type: 'DELETE_B2B_USERS_DELETE', recordid, body, callback});
export const PutLoginUserPasswordUpdate = (recordid, body, callback) => ({type: 'PUT_ADMIN_USER_PASSWORD_UPDATE', recordid, body, callback});
export const postB2BUsersReportList = (body, callback) => ({type: 'POST_B2B_USERS_LREPORT_IST', body, callback});
export const postB2bUsersTotalList = (body, callback) => ({type: 'POST_B2B_TOTAL_USERS_LIST', body, callback});
export const GetB2BRegisterUserData = (id, callback) => ({type: 'GET_B2B_REGISTER_USERS_DATA', id, callback});
export const putRegisterUsrUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_REGISTER_USERS_DATA_UPDATE', recordId, body, callback})