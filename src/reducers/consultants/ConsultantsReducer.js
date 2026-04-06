/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const initialState = {
  cnsltantsList: [],
  cnsltantsListCount: 0,
};

const ConsultantsReducer = (state = initialState, action) => {
  const newState = { ...state };
  const data = action.data;
  switch (action.type) {
    case 'SET_B2B_CNSLTANTS_LIST':
      if (data.status === '200') {
        newState.cnsltantsList = data.resData.result.consultantsList;
        newState.cnsltantsListCount = data.resData.result.consultantsListCount;
      }
      break;
  }
  return newState;
}

export default ConsultantsReducer;
