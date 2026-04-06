/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const getB2BUserProfileView = (callback) => ({type: 'GET_B2B_USER_PROFILE_VIEW', callback});
export const postB2BUserProfileUpdate = (body, callback) => ({type: 'POST_B2B_USER_PROFILE_UPDATE', body, callback})
export const postB2BUserProfileAdrsUpdate = (body, callback) => ({type: 'POST_B2B_USER_PROFILE_ADRS_UPDATE', body, callback})
export const postB2BUserChangePassword = (body, callback) => ({type: 'POST_B2B_USER_CHANGE_PASSWORD', body, callback});
