/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BRolesList = (body, callback) => ({ type: 'POST_B2B_ROLES_LIST', body, callback });
export const postB2BRolesCreate = (body, callback) => ({ type: 'POST_B2B_ROLES_CREATE', body, callback });
export const getB2BRoleView = (id, callback) => ({ type: 'GET_B2B_ROLES_VIEW', id, callback });
export const putB2BRoleUpdate = (id, body, callback) => ({ type: 'PUT_B2B_ROLE_UPDATE', id, body, callback });
export const putB2BRoleStatusUpdate = (id, body, callback) => ({ type: 'PUT_B2B_ROLE_STATUS_UPDATE', id, body, callback });
export const deleteB2BRolesDelete = (id, body, callback) =>({ type: 'DELETE_B2B_ROLE_DELETE', id, body, callback});
export const postB2BRolesActiveList = (body, callback) => ({ type: 'POST_B2B_ROLES_ACTIVE_LIST', body, callback });
