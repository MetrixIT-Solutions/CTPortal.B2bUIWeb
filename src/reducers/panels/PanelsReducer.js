/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const initialState = {
  orgTeamsList: [],
  orgTeamsListCount: 0,
};

const PanelsReducer = (state = initialState, action) => {
  const newState = { ...state };
  const data = action.data;
  switch (action.type) {
    case 'SET_B2B_TEAMS_LIST':
      if (data.status === '200') {
        newState.orgTeamsList = data.resData.result.orgTeamsList;
        newState.orgTeamsListCount = data.resData.result.orgTeamsListCount;
      }
      break;
  }
  return newState;
}

export default PanelsReducer;
