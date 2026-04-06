/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const getB2BMeetingLinkList = (callback) => ({type: "GET_B2B_MEETING_LINK_LIST", callback});
export const postB2BMeetingLinkCreate = (reqBody, callback) => ({type: "POST_B2B_MEETING_LINK_CREATE", reqBody, callback});
export const putB2BMeetingLinkDelete = (recordid, callback) => ({type: "PUT_B2B_MEETING_LINK_DELETE", recordid, callback});
export const getB2BMeetingLinkView = (recordid, callback) => ({type: "GET_B2B_MEETING_LINK_VIEW", recordid, callback});
export const putB2BMeetingLinkUpdate = (recordid, reqBody, callback) => ({type: "PUT_B2B_MEETING_LINK_UPDATE", recordid, reqBody, callback});
