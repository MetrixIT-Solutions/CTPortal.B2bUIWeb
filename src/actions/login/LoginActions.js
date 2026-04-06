/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const PostB2BUserLogin = (body, callback) => ({ type: 'POST_B2B_USER_LOGIN', body, callback });
export const PostB2BUserFrgtSendOtp = (body, callback) => ({ type: 'POST_B2B_USER_SEND_OTP', body, callback });
export const PostB2BUserFrgtVrfOtp = (body, callback) => ({ type: 'POST_B2B_USER_VERIFY_OTP', body, callback });
export const PostB2BUserFrgtRstPswd = (body, callback) => ({ type: 'POST_B2B_USER_RESET_OTP', body, callback });
export const PostB2BUserLogout = (callback) => ({ type: 'POST_B2B_USER_LOGOUT', callback });
export const SetLoggedInUserAuthObj = (data) => ({ type: 'SET_B2B_USER_LOGIN_AUTH_OBJ', data });
