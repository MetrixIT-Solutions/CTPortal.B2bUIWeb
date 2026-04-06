/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const PostB2BRolesAccessList = (body, callback) => ({ type: 'POST_B2B_ROLES_ACCESS_LIST', body, callback });
export const GetB2BRoleAccessView = (id, callback) => ({ type: 'GET_B2B_ROLE_ACCESS_VIEW', id, callback });
export const PostB2BRoleAccessCreate = (body, callback) => ({ type: 'POST_B2B_ROLE_ACCESS_CREATE', body, callback });
export const PutB2BRoleAccessUpdate = (id, body, callback) => ({ type: 'PUT_B2B_ROLE_ACCESS_UPDATE', id, body, callback });