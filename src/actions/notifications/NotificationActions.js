/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const getB2BNotificationsList = (callback) => ({ type: 'GET_B2B_NOTIFICATIONS_LIST', callback });
export const putNotificationsCountRead = (body, callback) => ({type: 'PUT_B2B_NOTIFICATION_UPDATE', body, callback });
