/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const getB2BConsInviteReviewersList = (invId, body, callback) => ({ type: 'GET_B2B_CONSULTANT_INVITE_REVIEWERS_LIST', invId, body, callback });
export const postB2BConsInviteReviewersCreate = (body, callback) => ({ type: 'POST_B2B_CONSULTANT_INVITE_REVIEWERS_CREATE', body, callback });
export const postB2BConsInviteReviewerNotesCreate = (body, callback) => ({ type: 'POST_B2B_CONSULTANT_INVITE_REVIEWERS_NOTES_CREATE', body, callback });