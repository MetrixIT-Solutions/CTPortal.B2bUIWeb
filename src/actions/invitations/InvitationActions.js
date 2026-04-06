/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const PostB2BInvitationsList = (body, callback) => ({type: 'POST_B2B_INVITATIONS_LIST', body, callback});
export const PostB2BInviteCnsltant = (body, callback) => ({type: 'POST_B2B_INVITE_CNSLTANT', body, callback});
export const deleteB2BInvitationsDelete = (recordId, body, callback) => ({ type: 'DELETE_B2B_INVITE_DELETE',recordId,  body, callback });
export const getB2BInvitationView = (recordId, callback) => ({ type: 'GET_B2B_INVITE_VIEW', recordId, callback});
export const GetB2BInvitationView = (id, callback) => ({type: 'GET_B2B_INVITATION_VIEW', id, callback});
export const putB2BInvitationsStatusUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_CONSULTANT_INVITE_STATUS_APPROVE', recordId, body, callback});
export const postB2BInvitationsClosedList = (body, callback) => ({type: 'POST_B2B_INVITATIONS_CLD_LIST', body, callback});
