/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const initialState = {
  orgsList: [],
  orgsListCount: 0,
};

const OrgsReducer = (state = initialState, action) => {
  const newState = { ...state };
  const data = action.data;
  switch (action.type) {
    case 'SET_B2B_ORGS_LIST':
      if (data.status === '200') {
        newState.orgsList = data.resData.result.orgsList;
        newState.orgsListCount = data.resData.result.orgsListCount;
      }
      break;
  }
  return newState;
}

export default OrgsReducer;