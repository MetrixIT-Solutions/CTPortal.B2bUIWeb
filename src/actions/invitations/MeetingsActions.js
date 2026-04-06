/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BConsInviteMeetingsList = (invId, body, callback) => ({type: 'POST_B2B_CONSULTANT_INVITATIONS_MEETINGS_LIST', invId, body, callback});
export const postB2BConsInviteMeetingsCreate = (body, callback) => ({type: 'POST_B2B_CONSULTANT_INVITATIONS_MEETINGS_CREATE', body, callback});
export const putB2BConsInviteMeetingReSchedule = (recordId, body, callback) => ({type: 'PUT_B2B_CONSULTANT_INVITATIONS_MEETINGS_RESCHEDULE', recordId, body, callback});
export const putB2BConsInviteMeetingStsUpdt = (recordId, body, callback) => ({type: 'PUT_B2B_CONSULTANT_INVITATIONS_MEETINGS_STSUPDT', recordId, body, callback});
