/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const initialState = {
  aiSearchArr: []
};

const AISearchReducer = (state = initialState, action) => {
  const newState = { ...state };
  const data = action.data;
  switch (action.type) {
    case 'SET_B2B_OPEN_AI_SEARCH':
      if (data.status === '200') {
        const resObj = data.resData.result;
        newState.aiSearchArr = [
          ...newState.aiSearchArr,
          { query: resObj.query, content: resObj.content }
        ];
      } else {
        newState.aiSearchArr = [];
      }
      break;
  }
  return newState;
};
export default AISearchReducer;