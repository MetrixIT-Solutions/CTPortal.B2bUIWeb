/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const PostB2BVendorsList = (body, callback) => ({type: 'POST_B2B_VENDORS_LIST', body, callback});
export const postB2BVendorsCreate = (body, callback) => ({type: 'POST_B2B_VENDORS_CREATE', body, callback});
export const GetB2BVendorsView = (recordId, callback) => ({type: 'GET_B2B_VENDORS_VIEW', recordId, callback});
export const PutB2BVendorsUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_VENDORS_UPDATE', recordId, body, callback});
export const putB2BVendorsStatusUpdate = (recordId, status, callback) => ({type: 'PUT_B2B_VENDORS_STATUS_UPDATE', recordId, status, callback});
export const PutB2BVendorsDelete = (recordId, body, callback) => ({type: 'PUT_B2B_VENDORS_DELETE', recordId, body, callback});