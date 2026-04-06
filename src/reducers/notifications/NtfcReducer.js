/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const initialState = {
  ntfcList: [],
  nuCount: 0,
  ncDt: null
};

const NtfcReducer = (state = initialState, action) => {
  const newState = { ...state };
  const data = action.data;

  switch (action.type) {
    case 'SET_B2B_NOTIFICATIONS_LIST':
      if (data.status === '200') {
        const ntfcList = data.resData.result;
        const unreadList = ntfcList.filter((item) => item.nStatus === 'Unread');
        newState.ntfcList = data.resData.result;
        newState.nuCount = unreadList.length; // Notifictions Unread Count
        newState.ncDt = new Date();
      }
      break;
  }
  return newState;
}

export default NtfcReducer;
