/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BConsInviteNotesList = (invId, body, callback) => ({type: 'POST_B2B_CONSULTANT_INVITATIONS_NOTES_LIST', invId, body, callback});
export const postB2BConsInviteNotesCreate = (body, callback) => ({type: 'POST_B2B_CONSULTANT_INVITATIONS_NOTES_CREATE', body, callback});
